const mongoose=require('mongoose');
const claimSchema = new mongoose.Schema({
  ip: { type: String, required: true },
  cookieId: { type: String},
  couponCode: { type: String, required: true },
  claimedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Claim", claimSchema);
