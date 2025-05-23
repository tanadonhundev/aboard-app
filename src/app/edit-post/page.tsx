"use client";

import NavBar from "@/components/app/Navbar";
import PostContent from "@/components/app/PostContent";

import SideBar from "@/components/app/SideBar";
import AuthGuard from "@/components/AuthGuard";

export default function EditPostPage() {
  return (
    <div>
      <AuthGuard>
        <NavBar />
        <div className="flex flex-col sm:flex-row w-full max-w-[1440px] mx-auto min-h-screen bg-base-grey-100">
          <SideBar />
          <div className="flex-1 flex-col items-center p-5">
            <PostContent />
          </div>
        </div>
      </AuthGuard>
    </div>
  );
}
