import { connectDB } from "../../../lib/db";
import Contact from "../../../models/ContactSubmission";

export async function POST(req) {
  await connectDB();
  const data = await req.json();
  return Response.json(await Contact.create(data));
}
