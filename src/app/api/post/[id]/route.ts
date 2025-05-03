/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Post from "@/lib/models/Post";
import Comment from "@/lib/models/Comment";
import { verifyAuth } from "@/utils/verifyAuth";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const post = await Post.findById(params.id).populate("author");

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    // Count comments for this post
    const contComment = await Comment.countDocuments({ post: post._id });

    // Convert Mongoose document to plain object and add contComment
    const postWithCommentCount = {
      ...post.toObject(),
      contComment,
    };

    return NextResponse.json(postWithCommentCount, { status: 200 });
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json(
      { message: "Server error", error },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const decoded = verifyAuth(req);
    if (!decoded) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Find the post before deleting
    const post = await Post.findById(params.id);
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Delete all comments related to the post
    await Comment.deleteMany({ post: params.id });

    // Delete the post
    await Post.findByIdAndDelete(params.id);

    return NextResponse.json({ message: "ลบโพสต์สำเร็จ" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const decoded = verifyAuth(req);
    if (!decoded) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const data = await req.json();
    await Post.findByIdAndUpdate(params.id, data, {
      new: true,
    });
    return NextResponse.json({ message: "แก้ไขโพสต์สำเร็จ" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
