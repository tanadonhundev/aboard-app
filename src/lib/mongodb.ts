import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  // ตรวจสอบการเชื่อมต่อ
  if (mongoose.connections[0].readyState) {
    // ถ้าเชื่อมต่ออยู่แล้วให้ข้าม
    return;
  }
  // เชื่อมต่อฐานข้อมูล MongoDB โดยไม่ใช้ options เก่า
  await mongoose.connect(process.env.DATABASE as string);
};

export default connectDB;
