"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { MdCheck, MdKeyboardArrowDown } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

type dataPost = {
  _id: string;
  category: string;
  title: string;
  content: string;
};

type EditPostFormProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: dataPost;
};

const menuItems = [
  { key: "History", label: "History" },
  { key: "Food", label: "Food" },
  { key: "Pets", label: "Pets" },
  { key: "Health", label: "Health" },
  { key: "Fashion", label: "Fashion" },
  { key: "Exprcise", label: "Exprcise" },
  { key: "Others", label: "Others" },
];

const EditPostForm = ({ open, onOpenChange, data }: EditPostFormProps) => {
  console.log(data);
  const [activeItem, setActiveItem] = useState<string | null>(
    data?.category ?? null
  );
  const [title, setTitle] = useState<string>(data?.title ?? "");
  const [content, setContent] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      const updatedPost = {
        category: activeItem,
        title: title,
        content: content,
      };
      const res = await axios.put(`/api/post/${data._id}`, updatedPost, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 201) {
        toast.success(res.data.message);
        onOpenChange(false);
      }
    } catch (error) {
      console.error("Failed to update post:", error);
    }
  };

  useEffect(() => {
    if (data && open) {
      setTitle(data.title ?? "");
      setContent(data.content ?? "");
      setActiveItem(data.category ?? null);
    }
  }, [data, open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[343px] max-h-[580px] md:max-w-[685px] md:max-h-[510px]">
        <DialogHeader>
          <DialogTitle className="text-left">Edit Post</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          <div ref={dropdownRef} className="relative">
            <Button
              variant={"outline"}
              className="mt-2 border-[#49A569] text-[#49A569] hover:bg-green-50 w-full sm:w-[195px]"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {activeItem
                ? menuItems.find((m) => m.key === activeItem)?.label
                : "Choose a community"}
              <MdKeyboardArrowDown className="ml-2" />
            </Button>

            {isDropdownOpen && (
              <ul className="absolute w-full left-0 mt-2 sm:w-[320px] bg-white border-[#DADADA] border rounded-lg shadow-md z-10">
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
          <Input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            placeholder="What's on your mind..."
            className="w-full p-3 border rounded-md resize-none min-h-[234px]"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button
            variant={"outline"}
            type="button"
            className="border-[#49A569] text-[#49A569] hover:bg-green-50"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            className="bg-success text-white"
            onClick={handleSubmit}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditPostForm;
