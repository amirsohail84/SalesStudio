import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-neutral-900">
      <h1 className="uppercase text-center text-8xl max-sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#fff] via-[#ff0000] to-[#eb4646] bg-[length:200%_100%] mb-8 p-2 animate-gradient">Page Not Found</h1>
      <button
        className="uppercase px-6 py-3 bg-black text-white font-bold rounded-full hover:bg-white hover:text-black"
        onClick={() => navigate("/")}
      >
        Go Home
      </button>
    </div>
  );
};

export default NotFound;
