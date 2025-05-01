import Link from "next/link";

export default function NavBar() {
  return (
    <div className="w-full bg-main-green-500">
      <div className="max-w-[1440px] mx-auto h-[60px] p-2 flex items-center justify-between">
        {/* โลโก้หรือข้อความฝั่งซ้าย */}
        <div className="text-nav-aboard text-white">a Board</div>

        {/* ปุ่ม Sign In ฝั่งขวา */}
        <button className="bg-success text-white font-semibold px-4 py-2 rounded-md cursor-pointer">
          <Link href={"/sign-in"}> Sign In</Link>
        </button>
      </div>
    </div>
  );
}
