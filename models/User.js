import mongoose from "mongoose";
const schema = new mongoose.Schema({
  email: String,
  password: String
});
export default mongoose.models.User || mongoose.model("User", schema);
