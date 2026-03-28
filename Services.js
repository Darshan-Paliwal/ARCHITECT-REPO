/**
 * Services Routes
 */

const express = require("express");
const router = express.Router();
const Service = require("../models/Service");
const { protect } = require("../middleware/auth");

// GET /api/services — public
router.get("/", async (req, res) => {
  try {
    const services = await Service.find({ status: "published" }).sort({ order: 1 });
    res.json({ services });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// GET /api/services/admin — all (admin)
router.get("/admin", protect, async (req, res) => {
  try {
    const services = await Service.find().sort({ order: 1 });
    res.json({ services });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// POST /api/services
router.post("/", protect, async (req, res) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json({ service });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// PUT /api/services/:id
router.put("/:id", protect, async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!service) return res.status(404).json({ error: "Not found" });
    res.json({ service });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE /api/services/:id
router.delete("/:id", protect, async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// PATCH /api/services/reorder
router.patch("/reorder", protect, async (req, res) => {
  try {
    const { items } = req.body;
    await Promise.all(items.map(i => Service.findByIdAndUpdate(i.id, { order: i.order })));
    res.json({ message: "Reordered" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
