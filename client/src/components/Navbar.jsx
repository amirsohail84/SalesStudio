import { Link, useNavigate } from "react-router-dom";
import { MdLogin } from "react-icons/md";
import { IoHomeSharp } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";

const Navbar = () => {
  const navigate = useNavigate();
  const isAdminLoggedIn = !!localStorage.getItem("adminToken");

  return (
    <nav className="bg-neutral-950 p-4 text-white flex justify-between items-center">
      <h1 className="text-xl font-bold">Coupon App</h1>
      <div className="space-x-4 flex">
        <Link to="/" className="text-lg flex justify-between items-center gap-2 font-semibold hover:font-bold max-sm:gap-1"><IoHomeSharp size={20} />Home</Link>

        {isAdminLoggedIn ? (
          <>
            <Link to="/admin/dashboard" className="text-lg flex justify-between items-center gap-2 font-semibold max-sm:gap-1 hover:font-bold"><MdDashboard size={20} />Dashboard</Link>
          </>
        ) : (
          <>
            <Link to="/admin/login" className="text-lg flex justify-between items-center hover:font-bold"><MdLogin size={25} /></Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;