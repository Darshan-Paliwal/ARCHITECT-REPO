import mongoose from "mongoose";
const schema = new mongoose.Schema({
  url: String,
  type: String
});
export default mongoose.models.Media || mongoose.model("Media", schema);
