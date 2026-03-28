/**
 * Analytics Routes
 */

const express = require("express");
const router = express.Router();
const { AnalyticsEvent, ContactSubmission } = require("../models/Analytics");
const Project = require("../models/Project");
const { protect } = require("../middleware/auth");

// POST /api/analytics/track — track a pageview (public)
router.post("/track", async (req, res) => {
  try {
    const { event = "pageview", page, projectId } = req.body;
    await AnalyticsEvent.create({
      event,
      page,
      projectId: projectId || undefined,
      ipAddress: req.ip,
      userAgent: req.headers["user-agent"],
      referrer: req.headers.referer || "",
    });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// GET /api/analytics/summary — admin dashboard stats
router.get("/summary", protect, async (req, res) => {
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    const [
      totalPageviews,
      monthPageviews,
      lastMonthPageviews,
      totalContacts,
      monthContacts,
      newContacts,
      totalProjects,
      topProjects,
    ] = await Promise.all([
      AnalyticsEvent.countDocuments({ event: "pageview" }),
      AnalyticsEvent.countDocuments({ event: "pageview", date: { $gte: startOfMonth } }),
      AnalyticsEvent.countDocuments({ event: "pageview", date: { $gte: startOfLastMonth, $lt: startOfMonth } }),
      ContactSubmission.countDocuments(),
      ContactSubmission.countDocuments({ createdAt: { $gte: startOfMonth } }),
      ContactSubmission.countDocuments({ status: "new" }),
      Project.countDocuments({ status: "published" }),
      Project.find({ status: "published" }).sort({ views: -1 }).limit(5).select("title views slug"),
    ]);

    // Daily pageviews for last 30 days
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const dailyViews = await AnalyticsEvent.aggregate([
      { $match: { event: "pageview", date: { $gte: thirtyDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json({
      pageviews: { total: totalPageviews, thisMonth: monthPageviews, lastMonth: lastMonthPageviews },
      contacts: { total: totalContacts, thisMonth: monthContacts, new: newContacts },
      projects: { total: totalProjects, topViewed: topProjects },
      dailyViews,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
