"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getDeviceId } from "@/utils/device";

const userSchema = z.object({
  username: z
    .string()
    .min(5, { message: "Username ต้องมากกว่า 5 ตัวอักษร" })
    .trim(),
});

export default function SignInPage() {
  const router = useRouter();

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      username: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    form.setFocus("username");
  }, [form]);

  const handleOnSubmit = async (data: z.infer<typeof userSchema>) => {
    try {
      const deviceId = getDeviceId();
      console.log(deviceId);
      console.log("Sign In with:", data);

      const res = await axios.post("/api/signin", data); // เปลี่ยน endpoint ตามจริง
      console.log(res);
      toast.success("เข้าสู่ระบบสำเร็จ");
      router.replace("/");

      const { token } = res.data;

      // 👉 เก็บ token ไว้ใน localStorage
      localStorage.setItem("token", token);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Login failed:", error);
      alert(error?.response?.data?.message || "เกิดข้อผิดพลาดในการล็อกอิน");
    }
  };
  return (
    <div className="flex justify-center min-h-screen bg-main-green-500 w-full">
      <div className="flex flex-col lg:flex-row-reverse w-full max-w-[1440px]">
        {/* ขวา - Banner (จะอยู่บนในมือถือ) */}
        <div className="w-full lg:w-1/2 bg-main-green-500 flex items-center justify-center">
          <div className="w-full h-full bg-main-green-300 flex flex-col items-center justify-center text-white rounded-b-[36px] lg:rounded-tl-[36px] lg:rounded-br-none p-18">
            <Image
              src="/images/image.png"
              alt="Login Banner"
              className="mx-auto mb-4"
              width={300}
              height={230}
            />
            <h1 className="text-[28px] text-castoro">a Board</h1>
          </div>
        </div>

        {/* ซ้าย - Sign In (จะอยู่ล่างในมือถือ) */}
        <div className="w-full lg:w-1/2 bg-main-green-500 flex items-center justify-center mt-30">
          <div className="flex flex-col items-center justify-center  px-4">
            <div className="flex justify-start w-full">
              <h1 className="text-[28px] text-white text-inter mb-4">
                Sign in
              </h1>
            </div>
            <div className="flex flex-col gap-4 w-full max-w-[384px] items-center">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleOnSubmit)}>
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            placeholder="๊sername"
                            className="bg-white h-11 text-lg w-[343px] sm:w-[300px] md:w-[350px] lg:w-[384px]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="bg-success h-10 text-lg w-[343px] sm:w-[300px] md:w-[350px] lg:w-[384px] mt-3"
                  >
                    Sign In
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
