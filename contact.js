/**
 * Contact Routes
 */

const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const { ContactSubmission, AnalyticsEvent } = require("../models/Analytics");
const { protect } = require("../middleware/auth");
const xss = require("xss");

// POST /api/contact — public form submission
router.post(
  "/",
  [
    body("name").notEmpty().trim().isLength({ max: 100 }),
    body("email").isEmail().normalizeEmail(),
    body("message").notEmpty().trim().isLength({ min: 10, max: 2000 }),
    body("phone").optional().isMobilePhone(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const { name, email, phone, subject, message } = req.body;

      // Sanitize against XSS
      const submission = await ContactSubmission.create({
        name: xss(name),
        email,
        phone: phone ? xss(phone) : undefined,
        subject: subject ? xss(subject) : undefined,
        message: xss(message),
        ipAddress: req.ip,
      });

      // Log analytics event
      await AnalyticsEvent.create({
        event: "contact_submit",
        ipAddress: req.ip,
        userAgent: req.headers["user-agent"],
      });

      res.status(201).json({ message: "Message sent successfully", id: submission._id });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  }
);

// GET /api/contact — admin: all submissions
router.get("/", protect, async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const query = status ? { status } : {};
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await ContactSubmission.countDocuments(query);
    const submissions = await ContactSubmission.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    res.json({ submissions, total });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// PATCH /api/contact/:id/status — update status
router.patch("/:id/status", protect, async (req, res) => {
  try {
    const { status } = req.body;
    const submission = await ContactSubmission.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!submission) return res.status(404).json({ error: "Not found" });
    res.json({ submission });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE /api/contact/:id
router.delete("/:id", protect, async (req, res) => {
  try {
    await ContactSubmission.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
