"use client";
import { useEffect, useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { MdCheck, MdKeyboardArrowDown } from "react-icons/md";
import { Button } from "../ui/button";
import PostContent from "./PostContent";

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
    <div className="flex flex-col sm:flex-row w-full max-w-[1440px] min-h-screen bg-base-grey-100">
      {/* Main content */}
      <div className="flex-1 flex-col bg-base-gray-100 p-4 border">
        <div className="flex flex-row justify-between md:items-center gap-4 w-full">
          {/* Search Input */}
          <div className="hidden md:block relative">
            <input
              type="text"
              placeholder="Search"
              className="pl-12 pr-4 py-2 w-full md:w-[370px] xl:w-[535px] rounded-md border border-gray-300"
            />
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          <div className="flex items-center justify-between w-full">
            {/* ซ้าย: ไอคอนค้นหา */}
            <div className="sm:block md:hidden w-[50px]">
              <FiSearch />
            </div>

            {/* ขวา: Community + Create */}
            <div className="flex items-center gap-2">
              <details ref={detailsRef} className="relative">
                <summary className="cursor-pointer text-[#191919] list-none px-2 py-1 rounded">
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
              <Button className="bg-success rounded-[8px] w-[105px] h-[40px] flex items-center gap-x-1">
                Create +
              </Button>
            </div>
          </div>
        </div>
        <PostContent />
      </div>
      <div className="hidden lg:block w-[260px] bg-base-grey-100 p-4 gap-2"></div>
    </div>
  );
}
