"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { RiHome6Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  return (
    <div className="hidden lg:block w-[280px] bg-base-grey-100 p-4 gap-2">
      <div className="flex flex-col gap-2 pt-2 px-2 text-[#243831]">
        <Link
          href="/"
          className={`flex items-center gap-2 ${
            isActive("/") ? "font-bold" : ""
          }`}
        >
          <RiHome6Line size={20} />
          <span>Home</span>
        </Link>
        <Link
          href="/edit-post"
          className={`flex items-center gap-2 ${
            isActive("/edit-post") ? "font-bold" : ""
          }`}
        >
          <FaRegEdit size={20} />
          <span>Our Blog</span>
        </Link>
      </div>
    </div>
  );
}
