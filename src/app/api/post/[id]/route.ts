/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Post from "@/models/Post";
import jwt from "jsonwebtoken";
import Comment from "@/models/Comment";

// Your JWT secret (should be stored in .env)
const JWT_SECRET = process.env.JWT_SECRET!;

// export async function DELETE(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     // Connect to DB
//     await connectDB();

//     // Get token from headers (e.g., Authorization: Bearer <token>)
//     const authHeader = req.headers.get("authorization");
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }

//     const token = authHeader.split(" ")[1];

//     // Verify token
//     try {
//       jwt.verify(token, JWT_SECRET);
//     } catch (error) {
//       return NextResponse.json({ message: "Invalid token" }, { status: 401 });
//     }

//     // Delete post by ID
//     const deletedPost = await Post.findByIdAndDelete(params.id);
//     if (!deletedPost) {
//       return NextResponse.json({ message: "Post not found" }, { status: 404 });
//     }

//     return NextResponse.json({ message: "Post deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting post:", error);
//     return NextResponse.json(
//       { message: "Server error", error },
//       { status: 500 }
//     );
//   }
// }

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
