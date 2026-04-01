import { connectDB } from "../../../../lib/db";
import User from "../../../../models/User";
import bcrypt from "bcryptjs";
import { signToken } from "../../../../lib/auth";
import { cookies } from "next/headers";

export async function POST(req) {
  await connectDB();
  const { email, password } = await req.json();

  const user = await User.findOne({ email });
  if (!user) return Response.json({ error: "No user" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return Response.json({ error: "Wrong password" });

  const token = signToken(user);
  cookies().set("token", token, { httpOnly: true });

  return Response.json({ success: true });
}
