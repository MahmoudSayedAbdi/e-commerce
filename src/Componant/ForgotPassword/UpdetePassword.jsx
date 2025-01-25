import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";

export default function UpdetePassword() {
  // varible
  let setNavigater = useNavigate();
  let [errMassege, setErrMassege] = useState();
  let initialValues = {
    email: "",
    newPassword: "",
  };
  let baseUrl = "https://ecommerce.routemisr.com";
  // Yup
  let vaildYup = Yup.object({
    email: Yup.string().required().email("inclued @ and .com"),
    newPassword: Yup.string()
      .required()
      .matches(/^(?=.*?[0-9])(?=.*?[A-Za-z]).{8,32}$/, "new Password not matched"),
  });
  //Formik
  let updetePasswordForm = useFormik({
    initialValues,
    onSubmit: updetePasswordApi,
    validationSchema: vaildYup,
  });
  // Function API
  function updetePasswordApi(Data) {
    axios
      .put(`${baseUrl}/api/v1/auth/resetPassword`, Data)
      .then((req) => {
        if(req.data.token){
            setNavigater("/login");
        }
        // console.log(req.data)
      })
      .catch((err) => {
        setErrMassege(err.response.data.message);
        // console.log(err.response.data.message);
      });
  }

  return (
    <div className="mx-auto mt-0 container">

      {/* Alert */}
      {errMassege ? (
        <div
          className="p-4 mt-2  text-sm w-1/2 mx-auto text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          {errMassege}
        </div>
      ) : (
        ""
      )}


      <form
        className="max-w-xl mx-auto mt-10"
        onSubmit={updetePasswordForm.handleSubmit}
      >
        <h1 className=" font-bold text-left mb-3">Updete Password :</h1>

        {/* email */}
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            onChange={updetePasswordForm.handleChange}
            onBlur={updetePasswordForm.handleBlur}
            type="email"
            name="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-active focus:border-active block w-full  p-2.5 "
          />
          {updetePasswordForm.touched.email && updetePasswordForm.errors.email ? (
            <p className="text-red-800 text-left mb-5 ps-2 font-light ">
              {updetePasswordForm.errors.email}
            </p>
          ) : (
            ""
          )}
        </div>
        {/* password */}
        <div className="mb-5">
          <label
            htmlFor="newPassword"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your New Password
          </label>
          <input
            onChange={updetePasswordForm.handleChange}
            onBlur={updetePasswordForm.handleBlur}
            type="password"
            id="newPassword"
            name="newPassword"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-active focus:border-active block w-full  p-2.5 "
          />
          {updetePasswordForm.touched.newPassword && updetePasswordForm.errors.newPassword ? (
            <p className="text-red-800 text-left mb-5 ps-2 font-light ">
              {updetePasswordForm.errors.newPassword}
            </p>
          ) : (
            ""
          )}
        </div>

        {/* Updete botton */}
        <button
          disabled={!(updetePasswordForm.isValid && updetePasswordForm.dirty)}
          type="submit"
          className="text-white mt-5 disabled:opacity-20 bg-active hover:bg-active focus:ring-4 focus:outline-none focus:ring-active font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-active dark:hover:bg-active dark:focus:ring-active"
        >
          Updete
        </button>
      </form>
    </div>
  );
}
