import mongoose from "mongoose";
const schema = new mongoose.Schema({
  themeColor: String,
  logo: String,
  heroText: String
});
export default mongoose.models.Settings || mongoose.model("Settings", schema);
