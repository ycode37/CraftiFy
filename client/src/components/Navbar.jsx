import React, { useContext, useState, useEffect, useRef } from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, setShowLogin, logout, credit } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const profileRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const navItems = [
    { name: "Home", path: "/" },

    { name: "Pricing", path: "/buy" },
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        !event.target.closest('[aria-label="Toggle menu"]')
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e, action) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      action();
    }
  };

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  // Toggle mobile menu
  const toggleMobileMenu = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsOpen(!isOpen);
  };

  // Close mobile menu
  const closeMobileMenu = () => {
    setIsOpen(false);
  };

  // Handle credit check
  const handleCreateImage = () => {
    if (credit > 0) {
      navigate("/result");
      closeMobileMenu();
    } else {
      toast.info(
        "You need credits to create new images. Redirecting to upgrade...",
        {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
      setTimeout(() => {
        navigate("/buy");
        closeMobileMenu();
      }, 1000);
    }
  };

  return (
    <nav
      className="sticky top-0 z-40 bg-white/95 backdrop-blur-lg shadow-sm border-b border-blue-50"
      id="nav-bar"
      role="navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Logo */}
          <Link
            to="/"
            className="flex items-center flex-shrink-0"
            aria-label="Imagify Home"
          >
            <img
              src={assets.logo}
              alt="Imagify Logo"
              className="w-24 sm:w-28 lg:w-32 transition-transform hover:scale-105"
            />
          </Link>

          {/* Center - Navigation Items */}
          <nav
            className="hidden md:flex items-center space-x-2"
            aria-label="Main navigation"
          >
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-5 py-2.5 text-sm font-semibold rounded-full transition-all duration-300 ${
                  location.pathname === item.path
                    ? "text-blue-700 bg-gradient-to-r from-blue-100 to-indigo-100 shadow-sm"
                    : "text-slate-600 hover:text-blue-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50"
                }`}
                aria-current={
                  location.pathname === item.path ? "page" : undefined
                }
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right side - Auth & Actions */}
          <div className="flex items-center space-x-3">
            {user ? (
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => navigate("/result")}
                  className="hidden sm:flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full transition-all duration-300 shadow-md hover:shadow-lg font-semibold text-sm"
                  aria-label="Create new image"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  <span>Create</span>
                </button>

                <div className="hidden sm:flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full border border-blue-200">
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                  <span className="text-sm font-semibold text-blue-700">
                    {credit} Credits
                  </span>
                </div>

                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    onKeyDown={(e) =>
                      handleKeyDown(e, () => setIsProfileOpen(!isProfileOpen))
                    }
                    className="flex items-center space-x-2 p-2 rounded-full hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 border border-transparent hover:border-blue-200"
                    aria-label="User menu"
                    aria-expanded={isProfileOpen}
                  >
                    <img
                      src={user.avatar || assets.profile_icon}
                      alt="Profile"
                      className="w-9 h-9 rounded-full object-cover border-2 border-blue-100"
                    />
                    <svg
                      className="hidden sm:block w-4 h-4 text-slate-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  <div
                    className={`absolute right-0 mt-3 w-56 bg-white/95 backdrop-blur-lg rounded-xl py-2 shadow-xl ring-1 ring-blue-100 border border-blue-50 transition-all duration-300 ${
                      isProfileOpen
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-2 pointer-events-none"
                    }`}
                    role="menu"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <div className="px-5 py-3 border-b border-blue-100">
                      <p className="text-sm font-semibold text-slate-800">
                        {user.name}
                      </p>
                      <p className="text-xs text-slate-500">{user.email}</p>
                    </div>
                    <Link
                      to="/dashboard"
                      className="block px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-blue-700 transition-all duration-200"
                      role="menuitem"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/settings"
                      className="block px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-blue-700 transition-all duration-200"
                      role="menuitem"
                    >
                      Settings
                    </Link>
                    <button
                      onClick={() => navigate("/buy")}
                      className="block w-full text-left px-5 py-2.5 text-sm font-medium text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-blue-700 transition-all duration-200"
                      role="menuitem"
                    >
                      Upgrade Plan
                    </button>
                    <div className="border-t border-blue-100 mt-1 pt-1">
                      <button
                        onClick={logout}
                        className="block w-full text-left px-5 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-all duration-200"
                        role="menuitem"
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <button
                  onClick={() => setShowLogin(true)}
                  onKeyDown={(e) => handleKeyDown(e, () => setShowLogin(true))}
                  className="hidden md:block bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
                  aria-label="Login"
                >
                  Login
                </button>
              </>
            )}

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                onKeyDown={(e) => handleKeyDown(e, toggleMobileMenu)}
                className="inline-flex items-center justify-center p-2 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300"
                aria-label="Toggle menu"
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
                tabIndex={0}
              >
                <svg
                  className="h-6 w-6"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  {isOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          ref={mobileMenuRef}
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isOpen
              ? "opacity-100 max-h-screen"
              : "opacity-0 max-h-0 pointer-events-none"
          }`}
        >
          <div className="px-2 pt-2 pb-4 space-y-2 border-t border-blue-100 bg-gradient-to-b from-blue-50/30 to-transparent">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-4 py-3 rounded-lg text-base font-semibold transition-all duration-200 ${
                  location.pathname === item.path
                    ? "text-blue-700 bg-gradient-to-r from-blue-100 to-indigo-100"
                    : "text-slate-600 hover:text-blue-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50"
                }`}
                onClick={closeMobileMenu}
              >
                {item.name}
              </Link>
            ))}
            {user ? (
              <>
                <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                    <span className="text-sm font-semibold text-blue-700">
                      {credit} Credits
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleCreateImage}
                  className="w-full text-left px-4 py-3 text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg transition-all duration-300 shadow-md"
                >
                  Create New Image
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setShowLogin(true);
                  closeMobileMenu();
                }}
                className="w-full text-left px-4 py-3 text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg transition-all duration-300 shadow-md"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
