import { connectDB } from "@/lib/db";
import Settings from "@/models/Settings";

export async function GET() {
  await connectDB();
  let s = await Settings.findOne();
  if (!s) s = await Settings.create({ heroText: "Welcome" });
  return Response.json(s);
}
export async function POST(req) {
  await connectDB();
  const data = await req.json();
  return Response.json(await Settings.findOneAndUpdate({}, data, { upsert: true }));
}
