/**
 * Team Routes
 */

const express = require("express");
const router = express.Router();
const Team = require("../models/Team");
const { protect } = require("../middleware/auth");
const { uploadTeam } = require("../config/cloudinary");

// GET /api/team — public
router.get("/", async (req, res) => {
  try {
    const team = await Team.find({ status: "active" }).sort({ order: 1 });
    res.json({ team });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// GET /api/team/admin
router.get("/admin", protect, async (req, res) => {
  try {
    const team = await Team.find().sort({ order: 1 });
    res.json({ team });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// POST /api/team
router.post("/", protect, async (req, res) => {
  try {
    const member = await Team.create(req.body);
    res.status(201).json({ member });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// PUT /api/team/:id
router.put("/:id", protect, async (req, res) => {
  try {
    const member = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!member) return res.status(404).json({ error: "Not found" });
    res.json({ member });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE /api/team/:id
router.delete("/:id", protect, async (req, res) => {
  try {
    await Team.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// POST /api/team/:id/image — upload photo
router.post("/:id/image", protect, uploadTeam.single("image"), async (req, res) => {
  try {
    const member = await Team.findByIdAndUpdate(
      req.params.id,
      { image: { url: req.file.path, publicId: req.file.filename } },
      { new: true }
    );
    res.json({ member });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
