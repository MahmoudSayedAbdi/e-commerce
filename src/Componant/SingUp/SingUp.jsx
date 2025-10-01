import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import * as Yup from "yup";

/**
 * SignUp Component
 * Handles user registration with form validation
 * Features: Form validation, error handling, success feedback
 */
export default function SignUp() {
  // Navigation
  const navigate = useNavigate();

  // State Management
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // API Configuration
  const BASE_URL = "https://ecommerce.routemisr.com";

  // Form Initial Values
  const initialValues = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  };

  // Yup Validation Schema
  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters")
      .max(20, "Name must be at most 20 characters"),
    email: Yup.string()
      .required("Email is required")
      .email("Please enter a valid email address"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*?[0-9])(?=.*?[A-Za-z]).{8,32}$/,
        "Password must be 8-32 characters and include letters and numbers"
      ),
    rePassword: Yup.string()
      .required("Please confirm your password")
      .oneOf([Yup.ref("password")], "Passwords must match"),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^01[01250][0-9]{8}$/, "Please enter a valid Egyptian phone number"),
  });

  /**
   * Handle Registration API Call
   * @param {Object} formData - User registration data
   */
  async function handleRegister(formData) {
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      await axios.post(`${BASE_URL}/api/v1/auth/signup`, formData);

      setSuccessMessage("Registration successful! Redirecting to login...");

      // Redirect to login page after 2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      const message = error.response?.data?.message || "Registration failed. Please try again.";
      setErrorMessage(message);
      console.error("Registration error:", message);
    } finally {
      setIsLoading(false);
    }
  }

  // Formik Configuration
  const registerForm = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleRegister,
  });

  /**
   * Render Input Field
   * Reusable component for form inputs to reduce code duplication
   */
  const renderInputField = (name, label, type = "text", placeholder = "") => (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-semibold text-gray-700 mb-2"
      >
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        onChange={registerForm.handleChange}
        onBlur={registerForm.handleBlur}
        value={registerForm.values[name]}
        placeholder={placeholder}
        className={`w-full px-4 py-3 rounded-lg border-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
          registerForm.touched[name] && registerForm.errors[name]
            ? "border-red-500 bg-red-50"
            : "border-gray-300 bg-gray-50 focus:bg-white focus:border-blue-500"
        }`}
      />
      {registerForm.touched[name] && registerForm.errors[name] && (
        <p className="mt-2 text-sm text-red-600 flex items-center">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {registerForm.errors[name]}
        </p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        {/* Card Container */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Create Account
            </h1>
            <p className="text-gray-600">Sign up to get started</p>
          </div>

          {/* Success Alert */}
          {successMessage && (
            <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-r-lg">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-green-500 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-sm text-green-800 font-medium">{successMessage}</p>
              </div>
            </div>
          )}

          {/* Error Alert */}
          {errorMessage && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-red-500 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-sm text-red-800 font-medium">{errorMessage}</p>
              </div>
            </div>
          )}

          {/* Registration Form */}
          <form onSubmit={registerForm.handleSubmit} className="space-y-5">
            {/* Name Field */}
            {renderInputField("name", "Full Name", "text", "Enter your full name")}

            {/* Email Field */}
            {renderInputField("email", "Email Address", "email", "you@example.com")}

            {/* Password Field */}
            {renderInputField("password", "Password", "password", "Create a strong password")}

            {/* Confirm Password Field */}
            {renderInputField("rePassword", "Confirm Password", "password", "Re-enter your password")}

            {/* Phone Field */}
            {renderInputField("phone", "Phone Number", "tel", "01XXXXXXXXX")}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!(registerForm.isValid && registerForm.dirty) || isLoading}
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Creating Account...
                </span>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-blue-600 hover:text-blue-700 hover:underline transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
