"use client";

import SideBar from "@/components/app/SideBar";
import NavBar from "@/components/app/Navbar";
import { FaArrowLeft } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import AddCommentForm from "@/components/app/AddCommentForm";

const posts = [
  {
    id: 1,
    avatarUrl: "https://github.com/shadcn.png",
    username: "tanadon",
    category: "History",
    title: "The Beginning of the End of the World",
    content:
      "The afterlife sitcom The Good Place comes to its culmination, the show’s two protagonists, Eleanor and Chidi, contemplate their future. Having lived thousands upon thousands of lifetimes together, and having experienced virtually everything this life has to offer, they are weary. It is time for it all to end. The show’s solution to this perpetual happiness-cum-weariness is extinction. When you have had enough, when you are utterly sated by love and joy and pleasure, you can walk through a passage to nothingness. And Chidi has had enough.",
    commentCount: 32,
  },
  {
    id: 2,
    avatarUrl: "https://github.com/shadcn.png",
    username: "alice",
    category: "Philosophy",
    title: "Existence and Meaning in a Digital World",
    content:
      "The afterlife sitcom The Good Place comes to its culmination, the show’s two protagonists, Eleanor and Chidi, contemplate their future. Having lived thousands upon thousands of lifetimes together, and having experienced virtually everything this life has to offer, they are weary. It is time for it all to end. The show’s solution to this perpetual happiness-cum-weariness is extinction. When you have had enough, when you are utterly sated by love and joy and pleasure, you can walk through a passage to nothingness. And Chidi has had enough.",
    commentCount: 18,
  },
  {
    id: 3,
    avatarUrl: "https://github.com/shadcn.png",
    username: "alice",
    category: "Philosophy",
    title: "Existence and Meaning in a Digital World",
    content:
      "The afterlife sitcom The Good Place comes to its culmination, the show’s two protagonists, Eleanor and Chidi, contemplate their future. Having lived thousands upon thousands of lifetimes together, and having experienced virtually everything this life has to offer, they are weary. It is time for it all to end. The show’s solution to this perpetual happiness-cum-weariness is extinction. When you have had enough, when you are utterly sated by love and joy and pleasure, you can walk through a passage to nothingness. And Chidi has had enough.",
    commentCount: 18,
  },
  {
    id: 4,
    avatarUrl: "https://github.com/shadcn.png",
    username: "alice",
    category: "Philosophy",
    title: "Existence and Meaning in a Digital World",
    content:
      "The afterlife sitcom The Good Place comes to its culmination, the show’s two protagonists, Eleanor and Chidi, contemplate their future. Having lived thousands upon thousands of lifetimes together, and having experienced virtually everything this life has to offer, they are weary. It is time for it all to end. The show’s solution to this perpetual happiness-cum-weariness is extinction. When you have had enough, when you are utterly sated by love and joy and pleasure, you can walk through a passage to nothingness. And Chidi has had enough.",
    commentCount: 18,
  },
];

const comments = [
  {
    id: 1,
    username: "tanadon",
    avatarUrl: "https://github.com/shadcn.png",
    timeAgo: "12h ago",
    content:
      "Lorem ipsum dolor sit amet consectetur. Purus cursus vel est a pretium quam imperdiet.",
  },
  {
    id: 2,
    username: "alice",
    avatarUrl: "https://github.com/shadcn.png",
    timeAgo: "5h ago",
    content:
      "Tristique auctor sed semper nibh odio iaculis sed aliquet. Amet mollis eget morbi.",
  },
];

export default function PostPage() {
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [open, setOpen] = useState(false);

  const params = useParams();
  const id = Number(params?.id); // Convert id from string to number
  const post = posts.find((p) => p.id === id);

  const handleAddCommentClick = () => {
    // ตรวจสอบขนาดหน้าจอเมื่อกดปุ่ม
    if (window.innerWidth <= 640) {
      setOpen(true); // เปิด AddPostForm เมื่อหน้าจอขนาดเล็กกว่า 640px
    } else {
      setShowCommentBox(true); // แสดง textarea แบบปกติเมื่อหน้าจอขนาดใหญ่กว่า 640px
    }
  };

  useEffect(() => {
    // ตรวจสอบขนาดหน้าจอทุกครั้งที่ขนาดหน้าจอเปลี่ยน
    const handleResize = () => {
      if (window.innerWidth <= 640) {
        setOpen(true); // เปิด AddPostForm ทันทีเมื่อขนาดหน้าจอลดลงน้อยกว่า 640px
      } else {
        setOpen(false); // ปิด AddPostForm เมื่อขนาดหน้าจอกลับเป็นใหญ่กว่า 640px
      }
    };

    // ฟังการเปลี่ยนแปลงขนาดหน้าจอ
    window.addEventListener("resize", handleResize);

    // ลบ event listener เมื่อ component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!post) return <p className="p-10">Post not found</p>;

  return (
    <>
      <NavBar />
      <div className="flex flex-col sm:flex-row w-full max-w-[1440px] mx-auto min-h-screen bg-base-grey-100">
        <SideBar />
        <div className="w-full bg-white px-5 py-8 lg:px-30 lg:py-14">
          <Link href={"/"}>
            <button className="rounded-full bg-main-green-100 w-[44px] h-[44px] flex items-center justify-center text-[#243831]">
              <FaArrowLeft size={16} />
            </button>
          </Link>
          <div className="flex items-center gap-2 text-[#939494] mt-7">
            <div className="relative w-11 h-11">
              <Avatar className="w-11 h-11">
                <AvatarImage src={post.avatarUrl} alt={post.username} />
                <AvatarFallback>{post.username[0]}</AvatarFallback>
              </Avatar>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
            </div>
            <p className="text-black">{post.username}</p>
            <p className="text-[#939494]">5mo.ago</p>
          </div>
          <div>
            <button className="w-auto h-auto rounded-[16px] mt-3 px-2 py-1 bg-[#F3F3F3]">
              <p className="text-[12px] text-[#4A4A4A]">{post.category}</p>
            </button>
          </div>
          <div className="mt-1">
            <div className="text-[16px] font-semibold">{post.title}</div>
            <div className="text-[12px] leading-[100%]">{post.content}</div>
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
              {post.commentCount} comment
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
                <div className="mt-3 hidden sm:block">
                  {/* สำหรับหน้าจอ md ขึ้นไป */}
                  <Textarea
                    placeholder="What's on your mind..."
                    className="w-full p-3 border rounded-md resize-none min-h-[100px]"
                  />
                  <div className="flex justify-end gap-2 mt-3">
                    <Button
                      variant="outline"
                      className="border-[#49A569] text-[#49A569] hover:bg-green-50"
                      onClick={() => setShowCommentBox(false)}
                    >
                      Cancel
                    </Button>
                    <Button className="bg-success text-white">Post</Button>
                  </div>
                </div>
              </>
            )}
          </div>
          <div>
            {comments.map((comment) => (
              <div key={comment.id} className="mt-6">
                <div className="flex items-center gap-2">
                  <Avatar className="w-10 h-10">
                    <AvatarImage
                      src={comment.avatarUrl}
                      alt={comment.username}
                    />
                    <AvatarFallback>
                      {comment.username.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <p className="text-black">{comment.username}</p>
                  <p className="text-[#939494]">{comment.timeAgo}</p>
                </div>
                <div className="text-[12px] leading-[100%] px-12 mt-3">
                  {comment.content}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <AddCommentForm
        open={open}
        onOpenChange={(value) => {
          setOpen(value);
          if (!value) {
            setShowCommentBox(false);
          }
        }}
      />
    </>
  );
}
