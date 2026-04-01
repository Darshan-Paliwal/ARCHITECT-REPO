import { connectDB } from "@/lib/db";
import Testimonial from "@/models/Testimonial";

export async function GET() {
  await connectDB();
  return Response.json(await Testimonial.find());
}
export async function POST(req) {
  await connectDB();
  return Response.json(await Testimonial.create(await req.json()));
}
