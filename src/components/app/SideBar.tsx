import { FaRegEdit } from "react-icons/fa";
import { RiHome6Line } from "react-icons/ri";

export default function SideBar() {
  return (
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
  );
}
