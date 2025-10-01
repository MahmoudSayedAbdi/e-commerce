import React, { useContext, useState } from "react";
import logo from "../../assets/images/freshcart-logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContextProvider/AuthContextProvider";
import { CartContext } from "../../Context/CartContextProvider/CartContextProvider";

/**
 * Navbar Component
 * Main navigation bar with authentication, cart management, and responsive design
 * @returns {JSX.Element} Responsive navigation bar component
 */
export default function Navbar() {
  // Context values for authentication and cart
  const { token, setToken } = useContext(AuthContext);
  const { numCartItem } = useContext(CartContext);

  // Navigation hook
  const navigate = useNavigate();

  // State for mobile menu toggle
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  /**
   * Handles user logout
   * Removes token from localStorage, resets auth state, and redirects to login
   */
  function logout() {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  }

  /**
   * Toggles mobile menu visibility
   */
  function toggleMobileMenu() {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo Section */}
          <Link
            to=""
            className="flex items-center space-x-2 flex-shrink-0 hover:opacity-80 transition-opacity"
          >
            <img
              src={logo}
              className="h-10"
              alt="FreshCart Logo"
            />
          </Link>

          {/* Desktop Navigation Links - Center */}
          {token && (
            <div className="hidden md:flex md:items-center md:space-x-8 flex-1 justify-center">
              <Link
                to=""
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Home
              </Link>
              <Link
                to="prodect"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Products
              </Link>
              <Link
                to="category"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Categories
              </Link>
              <Link
                to="brand"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Brands
              </Link>
            </div>
          )}

          {/* Desktop Right Section - Auth & Cart */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {token ? (
              <>
                {/* Cart Icon with Badge */}
                <Link
                  to="cart"
                  className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors duration-200"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  {numCartItem > 0 && (
                    <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {numCartItem}
                    </span>
                  )}
                </Link>

                {/* Logout Button */}
                <button
                  onClick={logout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                {/* Login Button */}
                <Link
                  to="login"
                  className="text-gray-700 hover:text-blue-600 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Login
                </Link>

                {/* Sign Up Button */}
                <Link
                  to="singUp"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            type="button"
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors duration-200"
            aria-controls="mobile-menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            {!isMobileMenuOpen ? (
              // Hamburger Icon
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            ) : (
              // Close Icon
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
          {token && (
            <>
              {/* Mobile Navigation Links */}
              <Link
                to=""
                onClick={toggleMobileMenu}
                className="text-gray-700 hover:bg-gray-100 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
              >
                Home
              </Link>
              <Link
                to="cart"
                onClick={toggleMobileMenu}
                className="text-gray-700 hover:bg-gray-100 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 flex items-center justify-between"
              >
                <span>Cart</span>
                {numCartItem > 0 && (
                  <span className="bg-blue-600 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                    {numCartItem}
                  </span>
                )}
              </Link>
              <Link
                to="prodect"
                onClick={toggleMobileMenu}
                className="text-gray-700 hover:bg-gray-100 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
              >
                Products
              </Link>
              <Link
                to="category"
                onClick={toggleMobileMenu}
                className="text-gray-700 hover:bg-gray-100 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
              >
                Categories
              </Link>
              <Link
                to="brand"
                onClick={toggleMobileMenu}
                className="text-gray-700 hover:bg-gray-100 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
              >
                Brands
              </Link>

              {/* Mobile Logout Button */}
              <button
                onClick={() => {
                  logout();
                  toggleMobileMenu();
                }}
                className="w-full text-left text-red-600 hover:bg-red-50 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
              >
                Logout
              </button>
            </>
          )}

          {/* Mobile Auth Buttons - Not Logged In */}
          {!token && (
            <>
              <Link
                to="login"
                onClick={toggleMobileMenu}
                className="text-gray-700 hover:bg-gray-100 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
              >
                Login
              </Link>
              <Link
                to="singUp"
                onClick={toggleMobileMenu}
                className="bg-blue-600 hover:bg-blue-700 text-white block px-3 py-2 rounded-md text-base font-medium text-center transition-colors duration-200"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
