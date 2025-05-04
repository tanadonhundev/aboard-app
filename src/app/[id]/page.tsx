"use client";
import SideBar from "@/components/app/SideBar";
import NavBar from "@/components/app/Navbar";

import CommentPost from "@/components/app/CommentPost";

export default function PostPage() {
  return (
    <>
      <NavBar />
      <div className="flex flex-col sm:flex-row w-full max-w-[1440px] mx-auto lg:min-h-screen bg-base-grey-100">
        <SideBar />
        <CommentPost />
      </div>
    </>
  );
}
