import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CouponClaim = () => {
  const [coupon, setCoupon] = useState("");

  const handleClaim = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND}/api/coupons/claim`, {}, { withCredentials: true });

      setCoupon(response.data.coupon);
      toast.success(`Coupon claimed: ${response.data.coupon}`);
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-neutral-900">
      <h2 className="text-3xl uppercase text-center max-sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#fff] via-[#626361] to-[#fff] bg-[length:200%_100%] mb-8 p-2 animate-gradient">Click on the button to claim your coupon</h2>
      
      {coupon && <p className="text-green-500 font-bold text-lg bg-black py-2 px-4 rounded-md">Your Coupon Code: {coupon}</p>}
      
      <button
        className="px-6 py-3 uppercase bg-black text-white rounded-full font-bold mt-4 hover:bg-white hover:text-black"
        onClick={handleClaim}
      >
        Claim Now
      </button>

      {/* Toast Notification Container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default CouponClaim;
