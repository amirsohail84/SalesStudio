const express = require("express");
const Coupon = require("../models/couponSchema");
const Claim = require("../models/claimSchema");
const { verifyAdmin } = require("./admin");
const router = express.Router();

// Middleware to prevent multiple claims
const checkAbuse = async (req, res, next) => {
  try {
    const ip = req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress;
    const cookieId = req.cookies.couponClaim || req.headers["user-agent"] || Math.random().toString(36).substring(7);

    const existingClaim = await Claim.findOne({ $or: [{ ip }, { cookieId }] });
    if (existingClaim) return res.status(429).json({ message: "You have already claimed a coupon." });

    req.userData = { ip, cookieId };
    next();
  } catch (err) {
    res.status(500).json({ message: "Error checking abuse" });
  }
};

// Claim Coupon (Guest User)
router.post("/claim", checkAbuse, async (req, res) => {
  try {
    const coupon = await Coupon.findOneAndUpdate(
      { status: "available" },
      { status: "claimed", claimedBy: req.userData, claimedAt: new Date() },
      { new: true }
    );

    if (!coupon)
      return res.status(404).json({ message: "No available coupons." });

    // Store claim history
    await Claim.create({
      ip: req.userData.ip,
      cookieId: req.userData.cookieId,
      couponCode: coupon.code,
    });

    res.cookie("couponClaim", req.userData.cookieId, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite:"None",
    });
    res.json({ message: "Coupon claimed successfully!", coupon: coupon.code });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Admin Routes (Manage Coupons)
router.get("/", verifyAdmin, async (req, res) => {
  try {
    const coupons = await Coupon.find();
    res.json(coupons);
  } catch {
    res.status(500).json({ message: "Error fetching coupons" });
  }
});

router.post("/add", verifyAdmin, async (req, res) => {
  try {
    const { code, quantity } = req.body;

    if (!code || quantity <= 0) {
      return res.status(400).json({ message: "Invalid coupon data" });
    }

    const newCoupon = new Coupon({ code, quantity });
    await newCoupon.save();

    res
      .status(201)
      .json({ message: "Coupon added successfully!", coupon: newCoupon });
  } catch (error) {
    res.status(500).json({ message: "Error adding coupon" });
  }
});

router.patch("/update/:id", verifyAdmin, async (req, res) => {
  try {
    const { status, quantity } = req.body;

    const updatedCoupon = await Coupon.findByIdAndUpdate(
      req.params.id,
      { status, quantity },
      { new: true }
    );

    if (!updatedCoupon)
      return res.status(404).json({ message: "Coupon not found" });

    res.json({ message: "Coupon updated!", coupon: updatedCoupon });
  } catch {
    res.status(500).json({ message: "Error updating coupon" });
  }
});

router.delete("/delete/:id", verifyAdmin, async (req, res) => {
  try {
    const deletedCoupon = await Coupon.findByIdAndDelete(req.params.id);
    if (!deletedCoupon)
      return res.status(404).json({ message: "Coupon not found" });

    res.json({ message: "Coupon deleted!" });
  } catch {
    res.status(500).json({ message: "Error deleting coupon" });
  }
});

module.exports = router;
