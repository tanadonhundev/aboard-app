/* eslint-disable @typescript-eslint/no-unused-vars */
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export function verifyAuth(req: Request) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Unauthorized");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (err) {
    throw new Error("Invalid token");
  }
}
