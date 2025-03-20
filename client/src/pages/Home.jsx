import React from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Home = () => {
  const navigate = useNavigate();

  const handleClaimClick = () => {
    toast.info("Redirecting to claim page...");
    navigate("/claim");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-neutral-900">
      <h1 className="text-center text-8xl max-sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#fff] via-[#626361] to-[#fff] bg-[length:200%_100%] mb-8 p-3 animate-gradient">Welcome to the Coupon App</h1>
      
      <button
        className="uppercase text-x px-6 py-3 bg-black text-white rounded-full font-bold hover:bg-white hover:text-black"
        onClick={handleClaimClick}
      >
        Claim a Coupon
      </button>

      {/* Toast Notification Container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Home;
