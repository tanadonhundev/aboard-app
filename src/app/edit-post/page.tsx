
import SideBar from "@/components/app/SideBar";
import NavBar from "@/components/app/Navbar";

export default function EditPostPage() {
  return (
    <>
      <NavBar />
      <div className="flex flex-col sm:flex-row w-full max-w-[1440px] mx-auto min-h-screen bg-base-grey-100">
        <SideBar />
        <div>edit-post</div>
      </div>
    </>
  );
}
