import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/lib/models/User";
import jwt from "jsonwebtoken";

type NewUser = {
  username: string;
};

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = (await req.json()) as NewUser;

    // ตรวจสอบว่า user มีอยู่หรือยัง
    let user = await User.findOne({ username: body.username });

    if (!user) {
      // ไม่พบผู้ใช้ → สมัครใหม่
      user = new User(body);
      await user.save();
    }

    // สร้าง JWT token
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return NextResponse.json(
      {
        message: "เข้าสู่ระบบสำเร็จ",
        token,
        user: {
          _id: user._id,
          username: user.username,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in login/register:", error);
    return NextResponse.json(
      { error: "เกิดข้อผิดพลาดในระบบ" },
      { status: 500 }
    );
  }
}
