/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { FaArrowLeft } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useCallback, useEffect, useState } from "react";
import AddCommentForm from "@/components/app/AddCommentForm";
import axios from "axios";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";

type dataPost = {
  _id: string;
  title: string;
  content: string;
  category: string;
  author: {
    _id: string;
    username: string;
  };
  contComment: number;
  createdAt: string;
  updatedAt: string;
};

type dataComment = {
  _id: string;
  comment: string;
  author: {
    _id: string;
    username: string;
  };
  createdAt: string;
  updatedAt: string;
};

const commentSchema = z.object({
  content: z.string().min(1, { message: "Content ห้ามเว้นว่าง" }).trim(),
});

type formValues = z.infer<typeof commentSchema>;

export default function CommentPost() {
  const [dataPosts, setDataPosts] = useState<dataPost>();
  const [dataComment, setDataComment] = useState<dataComment[]>([]);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(commentSchema),
  });

  const onSubmit = async (data: formValues) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return router.replace("sign-in");
      }

      const formData = {
        comment: data.content,
        postId: dataPosts?._id,
      };

      const res = await axios.post("/api/comment", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 201) {
        toast.success(res.data.message);
        reset();
      }
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  const handleAddCommentClick = () => {
    // ตรวจสอบขนาดหน้าจอเมื่อกดปุ่ม
    if (window.innerWidth <= 640) {
      setOpen(true); // เปิด AddPostForm เมื่อหน้าจอขนาดเล็กกว่า 640px
    } else {
      setShowCommentBox(true); // แสดง textarea แบบปกติเมื่อหน้าจอขนาดใหญ่กว่า 640px
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 640 && showCommentBox === true) {
        setOpen(true);
      } else {
        setOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    // เรียกครั้งแรกเพื่อให้สถานะตรงกับขนาดหน้าจอปัจจุบัน
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [showCommentBox]);

  const fetchData = useCallback(async () => {
    try {
      const [commentRes, postRes] = await Promise.all([
        axios.get(`/api/comment/${id}`),
        axios.get(`/api/post/${id}`),
      ]);
      setDataComment(commentRes.data.comments);
      setDataPosts(postRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData, onSubmit]);

  return (
    <>
      {isLoading ? (
        <div className="text-center text-gray-500 py-10">Loading...</div>
      ) : (
        <div className="w-full bg-white px-5 py-8 lg:px-30 lg:py-14">
          <Link href={"/"}>
            <button className="rounded-full bg-main-green-100 w-[44px] h-[44px] flex items-center justify-center text-[#243831]">
              <FaArrowLeft size={16} />
            </button>
          </Link>
          <div className="flex items-center gap-2 text-[#939494] mt-7">
            <div className="relative w-11 h-11">
              <Avatar className="w-11 h-11">
                <AvatarImage
                  src={"https://github.com/shadcn.png"}
                  alt={dataPosts?.author.username}
                />
                <AvatarFallback>{"post.username[0]"}</AvatarFallback>
              </Avatar>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
            </div>
            <p className="text-black">{dataPosts?.author.username}</p>
            <p className="text-[#939494]">
              {dataPosts?.createdAt
                ? formatDistanceToNow(new Date(dataPosts.createdAt), {
                    addSuffix: true,
                  })
                : "Unknown date"}
            </p>
          </div>
          <div>
            <button className="w-auto h-auto rounded-[16px] mt-3 px-2 py-1 bg-[#F3F3F3]">
              <p className="text-[12px] text-[#4A4A4A]">
                {dataPosts?.category}
              </p>
            </button>
          </div>
          <div className="mt-1">
            <div className="text-[16px] font-semibold">{dataPosts?.title}</div>
            <div className="text-[12px] leading-[100%]">
              {dataPosts?.content}
            </div>
          </div>
          <div className="flex mt-5 items-center gap-1">
            <svg width="17" height="17" fill="none">
              <path
                d="M14.2612 8.83301C14.2612 12.1467 11.5749 14.833 8.26123 14.833C7.46313 14.833 6.70143 14.6772 6.00489 14.3943C5.87158 14.3402 5.80493 14.3131 5.75104 14.301C5.69834 14.2892 5.65933 14.2849 5.60532 14.2849C5.5501 14.2849 5.48995 14.2949 5.36966 14.3149L2.99774 14.7103C2.74935 14.7517 2.62516 14.7724 2.53535 14.7338C2.45675 14.7001 2.39412 14.6375 2.3604 14.5589C2.32189 14.4691 2.34258 14.3449 2.38398 14.0965L2.7793 11.7246C2.79935 11.6043 2.80938 11.5441 2.80937 11.4889C2.80936 11.4349 2.80504 11.3959 2.79323 11.3432C2.78115 11.2893 2.75408 11.2227 2.69994 11.0893C2.41705 10.3928 2.26123 9.6311 2.26123 8.83301C2.26123 5.5193 4.94752 2.83301 8.26123 2.83301C11.5749 2.83301 14.2612 5.5193 14.2612 8.83301Z"
                stroke="#939494"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="text-[#939494] text-[12px]">
              {dataPosts?.contComment} comment
            </p>
          </div>
          <div>
            {!showCommentBox && (
              <Button
                variant="outline"
                className="mt-5 border-[#49A569] text-[#49A569] hover:bg-green-50"
                onClick={handleAddCommentClick}
              >
                Add Comment
              </Button>
            )}
            {showCommentBox && (
              <>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mt-3 hidden sm:block">
                    {/* สำหรับหน้าจอ md ขึ้นไป */}
                    <Textarea
                      placeholder="What's on your mind..."
                      className="w-full p-3 border rounded-md resize-none min-h-[100px]"
                      {...register("content")}
                    />
                    {errors.content && (
                      <p className="text-red-500 px-2">
                        {errors.content.message}
                      </p>
                    )}
                    <div className="flex justify-end gap-2 mt-3">
                      <Button
                        variant="outline"
                        className="border-[#49A569] text-[#49A569] hover:bg-green-50"
                        onClick={() => setShowCommentBox(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-success text-white"
                      >
                        {isSubmitting ? "กำลังPost" : "Post"}
                      </Button>
                    </div>
                  </div>
                </form>
              </>
            )}
          </div>
          <div>
            {dataComment.map((comment) => (
              <div key={comment._id} className="mt-6">
                <div className="flex items-center gap-2">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={""} alt={comment.author.username} />
                    <AvatarFallback>
                      {comment.author.username.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <p className="text-black">{comment.author.username}</p>
                  <p className="text-[#939494]">
                    {dataPosts?.createdAt
                      ? formatDistanceToNow(new Date(comment.createdAt), {
                          addSuffix: true,
                        })
                      : "Unknown date"}
                  </p>
                </div>
                <div className="text-[12px] leading-[100%] px-12 mt-3">
                  {comment.comment}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <AddCommentForm
        open={open}
        onOpenChange={(value) => {
          setOpen(value);
          if (!value) {
            setShowCommentBox(false);
          }
        }}
        id={dataPosts?._id as string}
        refreshData={fetchData}
      />
    </>
  );
}
