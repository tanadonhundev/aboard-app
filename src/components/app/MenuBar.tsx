"use client";
import { useEffect, useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { MdCheck, MdKeyboardArrowDown } from "react-icons/md";
import { Button } from "../ui/button";
import AddPostForm from "./AddPostForm";

const menuItems = [
  { key: "History", label: "History" },
  { key: "Food", label: "Food" },
  { key: "Pets", label: "Pets" },
  { key: "Health", label: "Health" },
  { key: "Fashion", label: "Fashion" },
  { key: "Exprcise", label: "Exprcise" },
  { key: "Others", label: "Others" },
];

type Props = {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
};

export default function MenuBar({ searchTerm, setSearchTerm }: Props) {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (item: string) => {
    setActiveItem(item);
    setIsDropdownOpen(false);
  };

  const handleAdd = () => {
    setOpen(true);
  };

  return (
    <div>
      {/* Main content */}
      <div className="py-3 flex flex-row justify-between md:items-center gap-4 w-full">
        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 pr-4 py-2 w-full md:w-[460px] xl:w-[535px] rounded-md border border-gray-300"
          />
          <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        <div className="flex items-center justify-between w-full">
          {/* ขวา: Community + Create */}
          <div className="flex items-center gap-2">
            <div ref={dropdownRef} className="relative">
              <div className="flex items-center">
                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                  community
                </button>
                <MdKeyboardArrowDown className="ml-2" />
              </div>
              {isDropdownOpen && (
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
              )}
            </div>
            <Button
              className="bg-success rounded-[8px] w-[105px] h-[40px] flex items-center gap-x-1"
              onClick={handleAdd}
            >
              Create +
            </Button>
          </div>
        </div>
      </div>
      <AddPostForm open={open} onOpenChange={setOpen} />
    </div>
  );
}
