/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Comment from "@/lib/models/Comment";
import { verifyAuth } from "@/utils/verifyAuth";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const decoded = verifyAuth(req);

    const userId = (decoded as any).userId;

    const { comment, postId } = await req.json();

    if (!comment || !postId) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const newComment = new Comment({
      comment,
      author: userId,
      post: postId,
    });

    await newComment.save();

    return NextResponse.json(
      { message: "โพสต์สำเร็จ", comment: newComment },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving comment:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
