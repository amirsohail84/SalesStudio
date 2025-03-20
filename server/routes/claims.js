const express = require("express");
const Claim = require("../models/claimSchema");
const { verifyAdmin } = require("../routes/admin");
const router = express.Router();

// Fetch all claims (Admin only)
router.get("/", verifyAdmin, async (req, res) => {
  try {
    const claims = await Claim.find().sort({ claimedAt: -1 }); // Sort by newest claims
    res.json(claims);
  } catch (error) {
    res.status(500).json({ message: "Error fetching claims" });
  }
});

module.exports = router;
