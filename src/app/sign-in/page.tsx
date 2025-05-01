import Image from "next/image";

export default function SignInPage() {
  return (
    <div className="flex justify-center min-h-screen bg-base-grey-100 ">
      <div className="flex flex-col lg:flex-row-reverse w-full max-w-[1440px]">
        {/* ขวา - Banner (จะอยู่บนในมือถือ) */}
        <div className="w-full lg:w-1/2 bg-main-green-500 flex items-center justify-center">
          <div className="w-full h-full bg-main-green-300 flex flex-col items-center justify-center text-white rounded-b-[36px] md:rounded-tl-[36px] md:rounded-br-none p-18">
            <Image
              src="/images/image.png"
              alt="Login Banner"
              className="mx-auto mb-4"
              width={300}
              height={230}
            />
            <h1 className="text-aboard text-2xl font-semibold">a board</h1>
          </div>
        </div>

        {/* ซ้าย - Sign In (จะอยู่ล่างในมือถือ) */}
        <div className="w-full lg:w-1/2 bg-main-green-500 flex items-center justify-center p-37">
          <div className="flex flex-col">
            <h1 className="text-singin">Sign in</h1>
            <div className="flex flex-col gap-4 mt-7">
              <input
                className="input-username p-3 rounded-md border border-gray-300"
                type="text"
                placeholder="Username"
              />
              <button
                type="submit"
                className="signin-button bg-white text-main-green-500 font-semibold py-2 rounded-md"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
