import { connectDB } from "@/lib/db";
import Contact from "@/models/ContactSubmission";

export async function POST(req) {
  await connectDB();
  return Response.json(await Contact.create(await req.json()));
}
