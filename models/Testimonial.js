import mongoose from "mongoose";
const schema = new mongoose.Schema({
  name: String,
  message: String
});
export default mongoose.models.Testimonial || mongoose.model("Testimonial", schema);
