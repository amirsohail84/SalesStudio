import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MdLogin } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify"; // Import toast for notifications

const AdminLogin = ({ setAdminToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Loading state for button
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setLoading(true); // Start loading

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND}/api/admin/login`, {
        username,
        password,
      });

      // Save token & update state
      localStorage.setItem("adminToken", response.data.token);
      setAdminToken(response.data.token);

      // Show success toast
      toast.success("Login successful!");

      // Delay navigation to allow the toast to be displayed
      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 1500); // Wait for 1.5 seconds before navigating

    } catch (error) {
      setLoading(false);
      const errorMessage = error?.response?.data?.message || "Login failed";
      setError(errorMessage);

      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-neutral-900">
      <h2 className="text-center uppercase text-5xl max-sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#fff] via-[#626361] to-[#fff] bg-[length:200%_100%] mb-8 p-1 animate-gradient">Admin Login</h2>

      <form onSubmit={handleLogin} className="bg-neutral-800 p-8 rounded-xl shadow-xl text-white">
        <input
          type="text"
          placeholder="Username"
          className="block w-full p-2 mb-4 border rounded-full"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="block w-full p-2 mb-6 border rounded-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="uppercase flex gap-2 items-center justify-center font-bold w-full px-4 py-2 bg-black text-white rounded hover:bg-white hover:text-black rounded-full btn"
          disabled={loading} // Disable button when loading
        >
          {loading ? (
            <span>Loading...</span> // Show loading text or spinner
          ) : (
            <>
              <MdLogin size={20} /> Login
            </>
          )}
        </button>
      </form>

      {/* ToastContainer is included here for this specific page */}
      <ToastContainer position="top-right" autoClose={1000} closeOnClick={true} />
    </div>
  );
};

export default AdminLogin;
