"use client";
import { useEffect, useRef, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { MdCheck, MdKeyboardArrowDown } from "react-icons/md";
import { RiHome6Line } from "react-icons/ri";

const menuItems = [
  { key: "History", label: "History" },
  { key: "Food", label: "Food" },
  { key: "Pets", label: "Pets" },
  { key: "Health", label: "Health" },
  { key: "Fashion", label: "Fashion" },
  { key: "Exprcise", label: "Exprcise" },
  { key: "Others", label: "Others" },
];


export default function MenuBar() {
      const [activeItem, setActiveItem] = useState<string | null>(null);
      const detailsRef = useRef<HTMLDetailsElement>(null);
    
      const handleSelect = (item: string) => {
        setActiveItem(item); // ตั้งค่า active item เมื่อมีการเลือก
      };
    
      useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
          if (
            detailsRef.current &&
            !detailsRef.current.contains(event.target as Node)
          ) {
            detailsRef.current.open = false;
          }
        };
    
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, []);
  return (
    <div className="flex flex-col sm:flex-row w-full max-w-[1440px] mx-auto min-h-screen bg-base-grey-100">
      {/* Sidebar */}
      <div className="hidden md:block w-[280px] bg-base-grey-100 p-4 gap-2">
        <div className="flex flex-col gap-2 pt-2 px-2 ">
          <a
            href="#"
            className="text-menu cursor-pointer flex items-center gap-2"
          >
            <RiHome6Line size={20} /> <span>Home</span>
          </a>
          <a
            href="#"
            className="text-menu cursor-pointer flex items-center gap-2"
          >
            <FaRegEdit size={20} /> <span>Our Blog</span>
          </a>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 bg-base-gray-100 p-4 border">
        <div className="flex flex-row items-start md:items-center gap-4 max-w-[798px]">
          {/* Search Input */}
          <div className="hidden sm:block relative w-full md:w-auto">
            <input
              type="text"
              placeholder="Search"
              className="pl-12 pr-4 py-2 w-full md:w-[535px] rounded-md border border-gray-300"
            />
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <div className="flex items-center flex-row gap-2">
            <div className="sm:block md:hidden w-[200px]">
              <FiSearch />
            </div>
            <details ref={detailsRef} className="relative">
              <summary className="cursor-pointer text-gray-700 list-none px-2 py-1 rounded">
                <div className="flex items-center">
                  <span>Community</span>
                  <MdKeyboardArrowDown size={20} />
                </div>
              </summary>
              <ul className="absolute right-0 mt-2 w-[202px] md:w-[320px] bg-white border-[#DADADA] border rounded-lg shadow-md z-10">
                {menuItems.map((item, index) => {
                  const isFirst = index === 0;
                  const isLast = index === menuItems.length - 1;
                  return (
                    <li
                      key={item.key}
                      onClick={() => handleSelect(item.key)}
                      className={`px-4 py-2 cursor-pointer flex justify-between items-center ${
                        activeItem === item.key
                          ? "bg-[#d8e9e4]"
                          : "hover:bg-[#d8e9e4]"
                      } ${isFirst ? "rounded-t-lg" : ""} ${
                        isLast ? "rounded-b-lg" : ""
                      }`}
                    >
                      {item.label}
                      {activeItem === item.key && <MdCheck />}
                    </li>
                  );
                })}
              </ul>
            </details>
            <button className="create-button">Create</button>
          </div>
        </div>
      </div>
    </div>
  );
}
