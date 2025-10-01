import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";

/**
 * UpdatePassword Component
 * Handles resetting user password with email + new password
 * Features: Validation, error handling, success redirect
 */
export default function UpdatePassword() {
  // Navigation
  const navigate = useNavigate();

  // State Management
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // API Configuration
  const BASE_URL = "https://ecommerce.routemisr.com";

  // Initial Values
  const initialValues = {
    email: "",
    newPassword: "",
  };

  // Yup Validation Schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Please enter a valid email address"),
    newPassword: Yup.string()
      .required("New Password is required")
      .matches(
        /^(?=.*?[0-9])(?=.*?[A-Za-z]).{8,32}$/,
        "Password must be 8-32 characters and include letters and numbers"
      ),
  });

  /**
   * Handle Update Password API Call
   * @param {Object} formData - User credentials (email, newPassword)
   */
  async function handleUpdatePassword(formData) {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await axios.put(
        `${BASE_URL}/api/v1/auth/resetPassword`,
        formData
      );

      // Success: redirect to login if token returned
      if (response.data.token) {
        navigate("/login");
      }
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Password update failed. Please try again.";
      setErrorMessage(message);
      console.error("Update password error:", message);
    } finally {
      setIsLoading(false);
    }
  }

  // Formik Configuration
  const updatePasswordForm = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleUpdatePassword,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Update Password
            </h1>
            <p className="text-gray-600">Enter your email & new password</p>
          </div>

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

          {/* Form */}
          <form onSubmit={updatePasswordForm.handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={updatePasswordForm.handleChange}
                onBlur={updatePasswordForm.handleBlur}
                value={updatePasswordForm.values.email}
                className={`w-full px-4 py-3 rounded-lg border-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
                  updatePasswordForm.touched.email &&
                  updatePasswordForm.errors.email
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300 bg-gray-50 focus:bg-white focus:border-blue-500"
                }`}
                placeholder="you@example.com"
              />
              {updatePasswordForm.touched.email &&
                updatePasswordForm.errors.email && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {updatePasswordForm.errors.email}
                  </p>
                )}
            </div>

            {/* New Password */}
            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                onChange={updatePasswordForm.handleChange}
                onBlur={updatePasswordForm.handleBlur}
                value={updatePasswordForm.values.newPassword}
                className={`w-full px-4 py-3 rounded-lg border-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
                  updatePasswordForm.touched.newPassword &&
                  updatePasswordForm.errors.newPassword
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300 bg-gray-50 focus:bg-white focus:border-blue-500"
                }`}
                placeholder="Enter your new password"
              />
              {updatePasswordForm.touched.newPassword &&
                updatePasswordForm.errors.newPassword && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {updatePasswordForm.errors.newPassword}
                  </p>
                )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={
                !(updatePasswordForm.isValid && updatePasswordForm.dirty) ||
                isLoading
              }
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-2"
                    viewBox="0 0 24 24"
                  >
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
                  Updating...
                </span>
              ) : (
                "Update Password"
              )}
            </button>
          </form>

          {/* Back to login */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Remembered your password?{" "}
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
