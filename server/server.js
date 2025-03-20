require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const couponRoutes = require("./routes/coupons.js");
const { router: adminRoutes } = require("./routes/admin.js");
const claimRoute=require("./routes/claims.js");


const app = express();

app.use(cors({
  origin: process.env.FRONTEND, // Allow only your frontend
  credentials: true, // Allow cookies & authentication headers
  methods: ["GET", "POST", "PATCH", "DELETE"],
}));

// Middleware
app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Basic route
app.get("/", (req, res) => {
  res.send("Coupon Distribution API is running...");
});

// Use Routes
app.use("/api/coupons", couponRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/claims", claimRoute);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
