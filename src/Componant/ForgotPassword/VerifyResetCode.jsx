import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function VerifyResetCode() {
  // Navigation
  const navigate = useNavigate();

  // State
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // API
  const BASE_URL = "https://ecommerce.routemisr.com";

  // Initial Values
  const initialValues = {
    resetCode: "",
  };

  // Validation Schema
  const validationSchema = Yup.object({
    resetCode: Yup.string()
      .required("Reset code is required")
      .min(5, "Code must be at least 5 characters"),
  });

  // Handle API
  async function handleVerifyCode(values) {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const res = await axios.post(`${BASE_URL}/api/v1/auth/verifyResetCode`, values);

      if (res.data.status === "Success") {
        navigate("/UpdetePassword");
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Verification failed. Please try again.";
      setErrorMessage(msg);
      console.error("Verify error:", msg);
    } finally {
      setIsLoading(false);
    }
  }

  // Formik Config
  const verifyForm = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleVerifyCode,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        {/* Card Container */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Verify Reset Code
            </h1>
            <p className="text-gray-600">Enter the code sent to your email</p>
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
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414
                    1.414L8.586 10l-1.293 1.293a1 1 0
                    101.414 1.414L10 11.414l1.293 1.293a1 1 0
                    001.414-1.414L11.414 10l1.293-1.293a1 1 0
                    00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-sm text-red-800 font-medium">{errorMessage}</p>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={verifyForm.handleSubmit} className="space-y-6">
            {/* Reset Code Field */}
            <div>
              <label
                htmlFor="resetCode"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Reset Code
              </label>
              <input
                type="text"
                id="resetCode"
                name="resetCode"
                onChange={verifyForm.handleChange}
                onBlur={verifyForm.handleBlur}
                value={verifyForm.values.resetCode}
                className={`w-full px-4 py-3 rounded-lg border-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 ${
                  verifyForm.touched.resetCode && verifyForm.errors.resetCode
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300 bg-gray-50 focus:bg-white focus:border-green-500"
                }`}
                placeholder="Enter reset code"
              />
              {verifyForm.touched.resetCode && verifyForm.errors.resetCode && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0
                      11-16 0 8 8 0 0116 0zm-7 4a1 1 0
                      11-2 0 1 1 0 012 0zm-1-9a1 1 0
                      00-1 1v4a1 1 0 102 0V6a1 1 0
                      00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {verifyForm.errors.resetCode}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!(verifyForm.isValid && verifyForm.dirty) || isLoading}
              className="w-full py-3 px-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-lg shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-green-300"
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
                      d="M4 12a8 8 0
                      018-8V0C5.373 0 0 5.373 0 12h4zm2
                      5.291A7.962 7.962 0 014 12H0c0
                      3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Verifying...
                </span>
              ) : (
                "Verify Code"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
