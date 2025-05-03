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
import { z } from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "sonner";

type AddPostFormProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const postSchema = z.object({
  title: z.string().min(1, { message: "Title ห้ามเว้นว่าง" }).trim(),
  content: z.string().min(1, { message: "Content ห้ามเว้นว่าง" }).trim(),
});

type formValues = z.infer<typeof postSchema>;

const menuItems = [
  { key: "History", label: "History" },
  { key: "Food", label: "Food" },
  { key: "Pets", label: "Pets" },
  { key: "Health", label: "Health" },
  { key: "Fashion", label: "Fashion" },
  { key: "Exprcise", label: "Exprcise" },
  { key: "Others", label: "Others" },
];

const AddPostForm = ({ open, onOpenChange }: AddPostFormProps) => {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(postSchema),
  });
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

  const onSubmit = async (data: formValues) => {
    try {
      const token = localStorage.getItem("token");

      const foemData = {
        title: data.title,
        content: data.content,
        category: activeItem,
      };

      const res = await axios.post("/api/post", foemData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 201) {
        toast.success(res.data.message);
        setActiveItem("");
        reset();
        onOpenChange(false);
      }
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[343px] max-h-[580px] md:max-w-[685px] md:max-h-[550px]">
        <DialogHeader>
          <DialogTitle className="text-left">Create Post</DialogTitle>
        </DialogHeader>
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

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-3">
            <Input type="text" placeholder="Title" {...register("title")} />
            {errors.title && (
              <p className="text-red-500 px-2">{errors.title.message}</p>
            )}
            <Textarea
              placeholder="What's on your mind..."
              className="w-full p-3 border rounded-md resize-none min-h-[234px]"
              {...register("content")}
            />
            {errors.content && (
              <p className="text-red-500 px-2">{errors.content.message}</p>
            )}
          </div>
          <DialogFooter className="mt-2">
            <Button
              variant={"outline"}
              type="submit"
              className="border-[#49A569] text-[#49A569] hover:bg-green-50"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting || !activeItem}>
              {isSubmitting ? "กำลังPost" : "Post"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPostForm;
