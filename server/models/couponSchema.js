const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  status: { type: String, enum: ["available", "claimed", "disabled"], default: "available" },
  claimedBy: {
    ip: { type: String, default: null },
    cookieId: { type: String, default: null },
  },
  claimedAt: { type: Date, default: null },
  quantity: { type: Number, required: true, default: 1 },
});

module.exports = mongoose.model("Coupon", couponSchema);