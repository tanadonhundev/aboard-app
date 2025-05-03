import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Post from "@/lib/models/Post";
import Comment from "@/lib/models/Comment";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    await connectDB();

    const post = await Post.findById(id).populate("author");

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    const comments = await Comment.find({ post: id })
      .populate("author")
      .sort({ createdAt: -1 });

    return NextResponse.json({ comments }, { status: 200 });
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json(
      { message: "Server error", error },
      { status: 500 }
    );
  }
}
