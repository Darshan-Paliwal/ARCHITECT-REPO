/**
 * Gallery Routes
 */

const express = require("express");
const router = express.Router();
const Gallery = require("../models/Gallery");
const { protect } = require("../middleware/auth");
const { uploadGallery } = require("../config/cloudinary");

// GET /api/gallery — public
router.get("/", async (req, res) => {
  try {
    const { category } = req.query;
    const query = { status: "published" };
    if (category) query.category = category;
    const images = await Gallery.find(query).sort({ order: 1, createdAt: -1 });
    res.json({ images });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// GET /api/gallery/categories — distinct categories
router.get("/categories", async (req, res) => {
  try {
    const categories = await Gallery.distinct("category", { status: "published" });
    res.json({ categories });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// GET /api/gallery/admin
router.get("/admin", protect, async (req, res) => {
  try {
    const images = await Gallery.find().sort({ order: 1, createdAt: -1 });
    res.json({ images });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// POST /api/gallery — upload multiple images
router.post("/", protect, uploadGallery.array("images", 50), async (req, res) => {
  try {
    const { category = "general", titles, alts } = req.body;
    const images = await Promise.all(
      req.files.map((file, i) =>
        Gallery.create({
          image: { url: file.path, publicId: file.filename },
          category,
          title: titles?.[i] || "",
          alt: alts?.[i] || "",
          status: "published",
        })
      )
    );
    res.status(201).json({ images });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// PUT /api/gallery/:id
router.put("/:id", protect, async (req, res) => {
  try {
    const image = await Gallery.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!image) return res.status(404).json({ error: "Not found" });
    res.json({ image });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE /api/gallery/:id
router.delete("/:id", protect, async (req, res) => {
  try {
    const image = await Gallery.findByIdAndDelete(req.params.id);
    if (!image) return res.status(404).json({ error: "Not found" });

    // Optionally delete from Cloudinary
    const { cloudinary } = require("../config/cloudinary");
    if (image.image?.publicId) {
      await cloudinary.uploader.destroy(image.image.publicId).catch(() => {});
    }
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
