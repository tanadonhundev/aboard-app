/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Post from "@/models/Post";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const authHeader = req.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, JWT_SECRET);

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
    console.error("POST /api/post error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
