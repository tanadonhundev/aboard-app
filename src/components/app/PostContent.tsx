import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const posts = [
  {
    avatarUrl: "https://github.com/shadcn.png",
    username: "tanadon",
    category: "History",
    title: "The Beginning of the End of the World",
    content:
      "The afterlife sitcom The Good Place comes to its culmination, the show’s two protagonists, Eleanor and Chidi, contemplate their future. Having lived thousands upon thousands of lifetimes together, and having experienced virtually everything this life has to offer, they are weary. It is time for it all to end. The show’s solution to this perpetual happiness-cum-weariness is extinction. When you have had enough, when you are utterly sated by love and joy and pleasure, you can walk through a passage to nothingness. And Chidi has had enough.",
    commentCount: 32,
  },
  {
    avatarUrl: "https://github.com/anotheruser.png",
    username: "alice",
    category: "Philosophy",
    title: "Existence and Meaning in a Digital World",
    content:
      "The afterlife sitcom The Good Place comes to its culmination, the show’s two protagonists, Eleanor and Chidi, contemplate their future. Having lived thousands upon thousands of lifetimes together, and having experienced virtually everything this life has to offer, they are weary. It is time for it all to end. The show’s solution to this perpetual happiness-cum-weariness is extinction. When you have had enough, when you are utterly sated by love and joy and pleasure, you can walk through a passage to nothingness. And Chidi has had enough.",
    commentCount: 18,
  },
  {
    avatarUrl: "https://github.com/anotheruser.png",
    username: "alice",
    category: "Philosophy",
    title: "Existence and Meaning in a Digital World",
    content:
      "The afterlife sitcom The Good Place comes to its culmination, the show’s two protagonists, Eleanor and Chidi, contemplate their future. Having lived thousands upon thousands of lifetimes together, and having experienced virtually everything this life has to offer, they are weary. It is time for it all to end. The show’s solution to this perpetual happiness-cum-weariness is extinction. When you have had enough, when you are utterly sated by love and joy and pleasure, you can walk through a passage to nothingness. And Chidi has had enough.",
    commentCount: 18,
  },
  {
    avatarUrl: "https://github.com/anotheruser.png",
    username: "alice",
    category: "Philosophy",
    title: "Existence and Meaning in a Digital World",
    content:
      "The afterlife sitcom The Good Place comes to its culmination, the show’s two protagonists, Eleanor and Chidi, contemplate their future. Having lived thousands upon thousands of lifetimes together, and having experienced virtually everything this life has to offer, they are weary. It is time for it all to end. The show’s solution to this perpetual happiness-cum-weariness is extinction. When you have had enough, when you are utterly sated by love and joy and pleasure, you can walk through a passage to nothingness. And Chidi has had enough.",
    commentCount: 18,
  },
];

export default function PostContent() {
  return (
    <>
      {posts.map((post, index) => (
        <div
          key={index}
          className={`p-5 gap-[10px] md:w-full xl:w-[798px] h-auto bg-white border ${
            index === 0
              ? "rounded-t-[12px]"
              : index === posts.length - 1
              ? "rounded-b-[12px]"
              : ""
          }`}
        >
          <div>
            <div className="flex items-center gap-2 text-[#939494] text-inter">
              <Avatar>
                <AvatarImage src={post.avatarUrl} alt={post.username} />
                <AvatarFallback>
                  {post.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <p>{post.username}</p>
            </div>
            <div>
              <button className="w-auto h-auto rounded-[16px] mt-3 px-2 py-1 bg-[#F3F3F3]">
                <p className="text-[16px] text-[#4A4A4A]">{post.category}</p>
              </button>
            </div>
            <div className="mt-1">
              <div className="text-[24px] font-semibold">{post.title}</div>
              <div className="text-[12px] leading-[100%] tracking-[0%] line-clamp-2">
                {post.content}
              </div>
            </div>
            <div className="flex mt-1 items-center gap-1">
              <svg
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.2612 8.83301C14.2612 12.1467 11.5749 14.833 8.26123 14.833C7.46313 14.833 6.70143 14.6772 6.00489 14.3943C5.87158 14.3402 5.80493 14.3131 5.75104 14.301C5.69834 14.2892 5.65933 14.2849 5.60532 14.2849C5.5501 14.2849 5.48995 14.2949 5.36966 14.3149L2.99774 14.7103C2.74935 14.7517 2.62516 14.7724 2.53535 14.7338C2.45675 14.7001 2.39412 14.6375 2.3604 14.5589C2.32189 14.4691 2.34258 14.3449 2.38398 14.0965L2.7793 11.7246C2.79935 11.6043 2.80938 11.5441 2.80937 11.4889C2.80936 11.4349 2.80504 11.3959 2.79323 11.3432C2.78115 11.2893 2.75408 11.2227 2.69994 11.0893C2.41705 10.3928 2.26123 9.6311 2.26123 8.83301C2.26123 5.5193 4.94752 2.83301 8.26123 2.83301C11.5749 2.83301 14.2612 5.5193 14.2612 8.83301Z"
                  stroke="#939494"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="text-[#939494] text-[12px]">
                {post.commentCount} comment
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
