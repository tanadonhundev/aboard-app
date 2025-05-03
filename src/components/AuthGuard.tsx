import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    // ตรวจสอบว่าอยู่ใน client-side
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      // ถ้าไม่มี token ให้ redirect ไปที่หน้า sign-in
      if (!token) {
        router.replace("/sign-in");
      }
    }
  }, [router]); // ใช้ router เป็น dependency เพื่อให้ effect ทำงานเมื่อ router เปลี่ยนแปลง

  return <>{children}</>;
}
