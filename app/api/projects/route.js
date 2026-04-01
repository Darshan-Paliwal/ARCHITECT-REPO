import { connectDB } from "../../../lib/db";
import Project from "../../../models/Project";

export async function GET() {
  await connectDB();
  return Response.json(await Project.find());
}

export async function POST(req) {
  await connectDB();
  const data = await req.json();
  return Response.json(await Project.create(data));
}
