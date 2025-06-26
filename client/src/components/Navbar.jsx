import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";
import { assets } from "../assets/assets"; // Corrected import path

const Navbar = () => {
  const { user, credit, setShowLogin, logout } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div className="w-full bg-teal-50">
      <div className="w-full flex items-center justify-between py-4 px-4 sm:px-6 lg:px-8">
        <Link to="/">
          <img
            src={assets.logo}
            alt="Logo"
            className="w-28 sm:w-32 lg:w-40 transition-transform hover:scale-105"
          />
        </Link>

        {/* Navigation Items */}
        <div>
          {user ? (
            // User is logged in
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Credits Button */}
              <button
                onClick={() => navigate("/buy")}
                className="flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full hover:bg-blue-200 transition-colors"
              >
                <img
                  className="w-5 h-5"
                  src={assets.credit_star}
                  alt="Credits"
                />
                <p className="text-xs sm:text-sm font-medium text-gray-600">
                  Credits left: {user?.creditBalance ?? 0}
                </p>
              </button>

              {/* User Greeting */}
              <p className="text-gray-600 max-sm:hidden pl-4 font-medium">
                Hi, {user.name}
              </p>

              {/* Profile Dropdown */}
              <div className="relative group">
                <img
                  src={assets.profile_icon || assets.profile_img_1} // Fallback if profile_icon missing
                  className="w-10 h-10 drop-shadow rounded-full cursor-pointer border-2 border-transparent group-hover:border-blue-300 transition-all"
                  alt="Profile"
                />

                {/* Dropdown Menu */}
                <div className="absolute hidden group-hover:block top-full right-0 z-10 mt-2 w-40 bg-white rounded-md shadow-lg border">
                  <ul className="list-none m-0 p-2">
                    <li
                      onClick={() => navigate("/profile")}
                      className="py-2 px-3 cursor-pointer hover:bg-gray-100 rounded text-sm"
                    >
                      My Profile
                    </li>
                    <li
                      onClick={logout}
                      className="py-2 px-3 cursor-pointer hover:bg-gray-100 rounded text-sm text-red-600"
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            // User is not logged in
            <div className="flex items-center gap-2 sm:gap-5">
              {/* Pricing Button */}
              <button
                onClick={() => navigate("/buy")}
                className="text-gray-600 font-medium hidden sm:block hover:text-blue-600 transition-colors"
              >
                Pricing
              </button>

              {/* Login Button */}
              <button
                onClick={() => setShowLogin(true)}
                className="bg-blue-800 text-white px-5 py-2 sm:px-7 rounded-full text-sm font-medium hover:bg-blue-900 transition-colors"
              >
                Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
