"use client";

import SideBar from "@/components/app/SideBar";
import NavBar from "@/components/app/Navbar";
import PostContent from "@/components/app/PostContent";

export default function HomePage() {
  return (
    <div>
      <NavBar />
      <div className="flex flex-col sm:flex-row w-full max-w-[1440px] mx-auto min-h-screen bg-base-grey-100">
        <SideBar />
        <div className="flex flex-col px-4 mt-5">
          <PostContent />
        </div>
      </div>
    </div>
  );
}
