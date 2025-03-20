import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify"; // Import toast and ToastContainer
import { MdDelete } from "react-icons/md";
import { MdLogout } from "react-icons/md";

const AdminDashboard = () => {
  const [coupons, setCoupons] = useState([]);
  const [claims, setClaims] = useState([]);
  const [newCoupon, setNewCoupon] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCoupons();
    fetchClaims();
  }, []);

  const fetchCoupons = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        toast.error("Unauthorized! Redirecting to login...");
        navigate("/admin/login");
        return;
      }

      const response = await axios.get(`${import.meta.env.VITE_BACKEND}/api/coupons`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCoupons(response.data);
    } catch (error) {
      toast.error("Error fetching coupons!");
    } finally {
      setLoading(false);
    }
  };

  const fetchClaims = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        toast.error("Unauthorized! Redirecting to login...");
        navigate("/admin/login");
        return;
      }

      const response = await axios.get(`${import.meta.env.VITE_BACKEND}/api/claims`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setClaims(response.data);
    } catch (error) {
      toast.error("Error fetching claims!");
    }
  };

  const toggleStatus = async (couponId, currentStatus) => {
    if (currentStatus === "claimed") {
      toast.warning("Cannot change status of a claimed coupon!");
      return;
    }

    const newStatus = currentStatus === "available" ? "disabled" : "available";

    try {
      const token = localStorage.getItem("adminToken");
      await axios.patch(
        `${import.meta.env.VITE_BACKEND}/api/coupons/update/${couponId}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success(`Coupon status changed to ${newStatus}`);
      fetchCoupons();
    } catch (error) {
      toast.error("Failed to update coupon status!");
    }
  };

  const handleAddCoupon = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      await axios.post(
        `${import.meta.env.VITE_BACKEND}/api/coupons/add`,
        { code: newCoupon},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Coupon added successfully!");
      setNewCoupon("");
      fetchCoupons();
    } catch (error) {
      toast.error("Failed to add coupon!");
    }
  };

  const handleDelete = async (couponId) => {
    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(`${import.meta.env.VITE_BACKEND}/api/coupons/delete/${couponId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCoupons(coupons.filter((coupon) => coupon._id !== couponId));
      toast.success("Coupon deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete coupon!");
    }
  };

  // Logout function to clear token and redirect to login page with toast
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    toast.success("Logged out successfully!"); // Toast notification for logout
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  return (
    <div className="p-6 relative min-h-screen bg-neutral-900">
      <button
        onClick={handleLogout}
        className="absolute top-6 right-4 px-3 py-2 bg-red-500 text-white rounded-full font-bold flex items-center gap-1 hover:bg-red-600 hover:uppercase"
      >
        <MdLogout size={20} />Logout
      </button>

      <h2 className="mb-10 text-4xl uppercase max-sm:text-2xl max-sm:mb-8 font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#fff] via-[#626361] to-[#fff] bg-[length:200%_100%] animate-gradient">Admin Dashboard</h2>

      {/* Add Coupon */}
      <div className="text-white mt-4 flex flex-col sm:flex-row sm:items-center sm:space-x-4">
        <input
          type="text"
          placeholder="Coupon Code"
          className="border p-2 rounded-full mb-2 sm:mb-0 sm:w-1/2"
          value={newCoupon}
          onChange={(e) => setNewCoupon(e.target.value)}
        />
        
        <button
          className="uppercase font-bold mt-4 sm:mt-0 px-6 py-3 bg-black text-white rounded-full hover:bg-white hover:text-black"
          onClick={handleAddCoupon}
        >
          Add Coupon
        </button>
      </div>

      {/* Coupon List */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-white">Coupons</h3>

        {loading ? (
          <p>Loading coupons...</p>
        ) : coupons.length === 0 ? (
          <p>No coupons available.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border mt-4">
              <thead>
                <tr className="bg-neutral-900 text-white">
                  <th className="border px-4 py-2">Coupon Code</th>
                  <th className="border px-4 py-2">Status</th>
                  
                  <th className="border px-4 py-2">Delete</th>
                </tr>
              </thead>
              <tbody>
                {coupons.map((coupon) => (
                  <tr key={coupon._id} className="text-center bg-neutral-800 text-white">
                    <td className="border px-4 py-2">{coupon.code}</td>

                    <td className="border px-4 py-2">
                      <button
                        className={`px-3 py-1 text-black font-bold uppercase rounded-full ${coupon.status === "claimed"
                            ? "bg-gray-400 cursor-not-allowed"
                            : coupon.status === "available"
                              ? "bg-green-500 hover:bg-green-600"
                              : "bg-yellow-500 hover:bg-yellow-600"
                          }`}
                        onClick={() => toggleStatus(coupon._id, coupon.status)}
                        disabled={coupon.status === "claimed"}
                      >
                        {coupon.status}
                      </button>
                    </td>

                    

                    <td className="border px-4 py-2">
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded-full hover:bg-red-600"
                        onClick={() => handleDelete(coupon._id)}
                      >
                        <MdDelete size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Claim List */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-white">Claim History</h3>

        {claims.length === 0 ? (
          <p>No claims found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border mt-4 bg-neutral-800 text-white">
              <thead>
                <tr className="bg-neutral-900 text-white">
                  <th className="border px-4 py-2">Coupon Code</th>
                  <th className="border px-4 py-2">IP Address</th>
                  <th className="border px-4 py-2">Claimed At</th>
                </tr>
              </thead>
              <tbody>
                {claims.map((claim) => (
                  <tr key={claim._id} className="text-center">
                    <td className="border px-4 py-2">{claim.couponCode}</td>
                    <td className="border px-4 py-2">{claim.ip}</td>
                    <td className="border px-4 py-2">
                      {new Date(claim.claimedAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ToastContainer for this page */}
      <ToastContainer position="top-right" autoClose={2000} closeOnClick={true} />
    </div>
  );
};

export default AdminDashboard;