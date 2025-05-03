/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Post from "@/models/Post";
import { verifyAuth } from "@/utils/verifyAuth";
import Comment from "@/models/Comment";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const decoded = verifyAuth(req);

    const userId = (decoded as any).userId;

    const body = await req.json();

    const { title, content, category } = body;

    if (!title || !content || !category) {
      return NextResponse.json({ error: "ข้อมูลไม่ครบถ้วน" }, { status: 400 });
    }

    await Post.create({
      title,
      content,
      category,
      author: userId,
    });

    return NextResponse.json({ message: "โพสต์สำเร็จ" }, { status: 201 });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    await connectDB();

    let posts;

    try {
      const decoded: any = verifyAuth(req);
      posts = await Post.find({ author: decoded.userId })
        .populate("author")
        .sort({ createdAt: -1 });
    } catch (err) {
      posts = await Post.find().populate("author").sort({ createdAt: -1 });
    }

    // Fetch comment count for each post
    const postsWithCommentCount = await Promise.all(
      posts.map(async (post) => {
        const count = await Comment.countDocuments({ post: post._id });
        return {
          ...post.toObject(),
          contComment: count,
        };
      })
    );

    return NextResponse.json(postsWithCommentCount, { status: 200 });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
