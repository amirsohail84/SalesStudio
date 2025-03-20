import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import Home from "./pages/Home";
import ClaimCoupon from "./components/CouponClaim";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import Navbar from "./components/Navbar";
import NotFound from './pages/NotFound';

function App() {
  const [adminToken, setAdminToken] = useState(localStorage.getItem("adminToken") || null);

  // Set up Axios defaults
  useEffect(() => {
    axios.defaults.baseURL = `${import.meta.env.VITE_BACKEND}/api`;
    axios.defaults.withCredentials = true;
    if (adminToken) {
      axios.defaults.headers.common["Authorization"] = adminToken;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [adminToken]);

  return (
    <>
      <Navbar /> {/* Add Navbar here */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/claim" element={<ClaimCoupon />} />
        <Route path="/admin/login" element={<AdminLogin setAdminToken={setAdminToken} />} />
        <Route path="/admin/dashboard" element={adminToken ? <AdminDashboard /> : <Navigate to="/admin/login" />} />
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </>
  );
}

export default App;
