/**
 * Media / General Upload Routes
 */

const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const { cloudinary, uploadMedia } = require("../config/cloudinary");

// POST /api/media/upload — upload single file
router.post("/upload", protect, uploadMedia.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file provided" });
    res.json({
      url: req.file.path,
      publicId: req.file.filename,
      format: req.file.mimetype,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// POST /api/media/upload-multiple — upload multiple files
router.post("/upload-multiple", protect, uploadMedia.array("files", 20), async (req, res) => {
  try {
    const files = req.files.map(f => ({
      url: f.path,
      publicId: f.filename,
      format: f.mimetype,
    }));
    res.json({ files });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE /api/media/:publicId — delete from Cloudinary
router.delete("/:publicId", protect, async (req, res) => {
  try {
    // Decode the publicId (may contain slashes encoded as %2F)
    const publicId = decodeURIComponent(req.params.publicId);
    const result = await cloudinary.uploader.destroy(publicId);
    if (result.result !== "ok" && result.result !== "not found") {
      return res.status(400).json({ error: "Failed to delete" });
    }
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// GET /api/media/list — list all media from Cloudinary folder
router.get("/list", protect, async (req, res) => {
  try {
    const { folder = "arcstudio" } = req.query;
    const result = await cloudinary.api.resources({
      type: "upload",
      prefix: folder,
      max_results: 100,
    });
    res.json({ resources: result.resources });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
