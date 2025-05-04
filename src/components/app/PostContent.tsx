"use client";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import EditPostForm from "./EditPostForm";
import { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";
import Delete from "./Delete";
import axios from "axios";
import MenuBar from "./MenuBar";

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

type dataEditPost = {
  _id: string;
  category: string;
  title: string;
  content: string;
};

export default function PostContent() {
  const [dataPosts, setDataPosts] = useState<dataPost[]>([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editPostData, setEditPostData] = useState<dataEditPost | null>(null);
  const [postId, setPostId] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const pathname = usePathname();

  const handleEdit = (post: dataPost) => {
    setEditPostData(post);
    setOpenEdit(true);
  };

  const handleDelete = (_id: string) => {
    setPostId(_id);
    setOpenDelete(true);
  };

  const fetchData = async () => {
    try {
      const pathname = window.location.pathname;

      const config = {
        headers: {} as Record<string, string>,
      };

      if (pathname === "/edit-post") {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        } else {
          console.log("No token found");
          setIsLoading(false);
          return;
        }
      }

      const res = await axios.get("/api/post", config);
      setDataPosts(res.data); // ตั้งค่า dataPosts ที่ได้รับจาก API
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <MenuBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {isLoading ? (
        <div className="text-center text-gray-500 py-10">Loading...</div>
      ) : (
        dataPosts.map((post, index) => {
          const isMatched = post.title
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

          // ฟังก์ชันเพื่อทำการเน้นคำที่ค้นหา
          const highlightText = (text: string) => {
            if (!searchTerm) return text;

            const parts = text.split(new RegExp(`(${searchTerm})`, "gi"));
            return parts.map((part, index) =>
              part.toLowerCase() === searchTerm.toLowerCase() ? (
                <span key={index} className="bg-[#C5A365]">
                  {part}
                </span>
              ) : (
                part
              )
            );
          };

          return (
            <div
              key={post._id}
              className={`relative p-5 gap-[10px] w-auto sm:w-[680px] h-auto border 
            ${isMatched ? "bg-white" : "bg-white"} 
            ${
              index === 0
                ? "rounded-t-[12px]"
                : index === dataPosts.length - 1
                ? "rounded-b-[12px]"
                : ""
            }`}
            >
              {/* ไอคอน Edit & Delete มุมขวาบน */}
              {pathname === "/edit-post" && (
                <div className="absolute top-5 right-5 flex gap-4 text-[#2B5F44]">
                  <button
                    onClick={() => handleEdit(post)}
                    className="hover:text-green-500"
                  >
                    <AiOutlineEdit size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="hover:text-green-500"
                  >
                    <RiDeleteBinLine size={20} />
                  </button>
                </div>
              )}

              {/* เนื้อหาโพสต์ */}
              <div className="flex items-center gap-2 text-[#939494] text-inter">
                <Avatar>
                  <AvatarImage
                    src={"https://github.com/shadcn.png"}
                    alt={"avatar"}
                  />
                  <AvatarFallback>
                    {post.author.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <p>{post.author.username}</p>
              </div>

              <div>
                <button className="w-auto h-auto rounded-[16px] mt-3 px-2 py-1 bg-[#F3F3F3]">
                  <p className="text-[12px] text-[#4A4A4A]">{post.category}</p>
                </button>
              </div>

              <div className="mt-1">
                <div className="text-[16px] font-semibold">
                  {highlightText(post.title)}
                </div>
                <div className="text-[12px] leading-[100%] tracking-[0%] line-clamp-2">
                  {post.content}
                </div>
              </div>

              <div className="flex mt-1 items-center gap-1">
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 17 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.2612 8.83301C14.2612 12.1467 11.5749 14.833 8.26123 14.833C7.46313 14.833 6.70143 14.6772 6.00489 14.3943C5.87158 14.3402 5.80493 14.3131 5.75104 14.301C5.69834 14.2892 5.65933 14.2849 5.60532 14.2849C5.5501 14.2849 5.48995 14.2949 5.36966 14.3149L2.99774 14.7103C2.74935 14.7517 2.62516 14.7724 2.53535 14.7338C2.45675 14.7001 2.39412 14.6375 2.3604 14.5589C2.32189 14.4691 2.34258 14.3449 2.38398 14.0965L2.7793 11.7246C2.79935 11.6043 2.80938 11.5441 2.80937 11.4889C2.80936 11.4349 2.80504 11.3959 2.79323 11.3432C2.78115 11.2893 2.75408 11.2227 2.69994 11.0893C2.41705 10.3928 2.26123 9.6311 2.26123 8.83301C2.26123 5.5193 4.94752 2.83301 8.26123 2.83301C11.5749 2.83301 14.2612 5.5193 14.2612 8.83301Z"
                    stroke="#939494"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <Link href={`/${post._id}`}>
                  <p className="text-[#939494] text-[12px]">
                    {post.contComment} comment
                  </p>
                </Link>
              </div>
            </div>
          );
        })
      )}
      <EditPostForm
        open={openEdit}
        onOpenChange={setOpenEdit}
        data={editPostData as dataEditPost}
        refreshData={fetchData}
      />
      <Delete
        open={openDelete}
        onOpenChange={setOpenDelete}
        id={postId as string}
        refreshData={fetchData}
      />
    </>
  );
}
