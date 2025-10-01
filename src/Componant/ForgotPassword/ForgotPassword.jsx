import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import VerifyResetCode from "./VerifyResetCode";

/**
 * ForgotPassword Component
 * Handles password reset request by sending verification code to user's email
 * Features: Form validation, error handling, conditional rendering
 */
export default function ForgotPassword() {
  // State Management
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotForm, setShowForgotForm] = useState(true);

  // API Configuration
  const BASE_URL = "https://ecommerce.routemisr.com";

  // Form Initial Values
  const initialValues = {
    email: "",
  };

  // Yup Validation Schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Please enter a valid email address"),
  });

  /**
   * Handle Forgot Password API Call
   * Sends verification code to user's email
   * @param {Object} formData - Contains user's email
   */
  async function handleForgotPassword(formData) {
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/auth/forgotPasswords`,
        formData
      );

      // Check if code was sent successfully
      if (response.data.statusMsg === "success") {
        setSuccessMessage("Verification code sent to your email!");

        // Show verification form after 1.5 seconds
        setTimeout(() => {
          setShowForgotForm(false);
        }, 1500);
      }
    } catch (error) {
      const message = error.response?.data?.message || "Failed to send code. Please try again.";
      setErrorMessage(message);
      console.error("Forgot password error:", message);
    } finally {
      setIsLoading(false);
    }
  }

  // Formik Configuration
  const forgotPasswordForm = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleForgotPassword,
  });

  return (
    <>
      {showForgotForm ? (
        // Forgot Password Form - Send verification code to email
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-indigo-100 flex items-center justify-center px-4 py-12">
          <div className="max-w-md w-full">
            {/* Card Container */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                    />
                  </svg>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Forgot Password?
                </h1>
                <p className="text-gray-600">
                  Enter your email to receive a verification code
                </p>
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
                    <p className="text-sm text-green-800 font-medium">
                      {successMessage}
                    </p>
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
                    <p className="text-sm text-red-800 font-medium">
                      {errorMessage}
                    </p>
                  </div>
                </div>
              )}

              {/* Form */}
              <form onSubmit={forgotPasswordForm.handleSubmit} className="space-y-6">
                {/* Email Field */}
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
                    onChange={forgotPasswordForm.handleChange}
                    onBlur={forgotPasswordForm.handleBlur}
                    value={forgotPasswordForm.values.email}
                    placeholder="you@example.com"
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 ${
                      forgotPasswordForm.touched.email &&
                      forgotPasswordForm.errors.email
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300 bg-gray-50 focus:bg-white focus:border-green-500"
                    }`}
                  />
                  {forgotPasswordForm.touched.email &&
                    forgotPasswordForm.errors.email && (
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
                        {forgotPasswordForm.errors.email}
                      </p>
                    )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={
                    !(forgotPasswordForm.isValid && forgotPasswordForm.dirty) ||
                    isLoading
                  }
                  className="w-full py-3 px-4 bg-gradient-to-r from-green-600 to-indigo-600 hover:from-green-700 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-green-300"
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
                      Sending Code...
                    </span>
                  ) : (
                    "Send Verification Code"
                  )}
                </button>
              </form>

              {/* Back to Login Link */}
              <div className="mt-6 text-center">
                <Link
                  to="/login"
                  className="text-sm font-medium text-green-600 hover:text-green-700 hover:underline transition-colors inline-flex items-center"
                >
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  Back to Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Show Verification Code Form
        <VerifyResetCode />
      )}
    </>
  );
}
