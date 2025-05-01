"use client";

import { useState } from "react";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import { RiHome6Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full bg-main-green-500">
      <div className="max-w-[1440px] mx-auto h-[60px] px-4 flex items-center justify-between">
        {/* โลโก้ */}
        <div className="text-[20px] text-white text-castoro">a Board</div>

        {/* Desktop ปุ่ม Sign In */}
        <div className="hidden md:block">
          <Link href="/sign-in">
            <button className="bg-success text-white w-[105px] h-[40px] rounded-md">
              Sign In
            </button>
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="block md:hidden">
          <button onClick={() => setIsOpen(true)}>
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Drawer */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 bg-opacity-50 z-50"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="fixed right-0 top-0 w-70 h-full bg-main-green-500 shadow-lg p-10 z-50 rounded-bl-2xl rounded-tl-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="mb-4 text-right text-white w-full"
              onClick={() => setIsOpen(false)}
            >
              <FaArrowRightLong />
            </button>
            <div className="mt-5 space-y-3">
              <Link
                href="#"
                className="flex items-center space-x-2 text-white hover:text-gray-300"
              >
                <RiHome6Line size={20} />
                <span className="text-inter font-thin">Home</span>
              </Link>

              <Link
                href="#"
                className="flex items-center space-x-2 text-white hover:text-gray-300"
              >
                <FaRegEdit size={20} />
                <span className="text-inter font-thin">Our Blog</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
