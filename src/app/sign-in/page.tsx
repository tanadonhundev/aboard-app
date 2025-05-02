import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function SignInPage() {
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
          <div className="flex flex-col items-center justify-center w-full px-4">
            <h1 className="text-[28px] text-white text-inter mb-4">Sign in</h1>
            <div className="flex flex-col gap-4 w-full max-w-[384px] items-center">
              <Input
                type="text"
                placeholder="Username"
                className="bg-white h-11 text-lg w-[343px] sm:w-[300px] md:w-[350px] lg:w-[384px]"
              />
              <Button className="bg-success h-10 text-lg w-[343px] sm:w-[300px] md:w-[350px] lg:w-[384px]">
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
