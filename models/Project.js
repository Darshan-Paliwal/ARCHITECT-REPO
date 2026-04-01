import mongoose from "mongoose";
const schema = new mongoose.Schema({
  title: String,
  description: String,
  images: [String]
}, { timestamps: true });
export default mongoose.models.Project || mongoose.model("Project", schema);
