import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function SingUp() {
  // variable
  let [errMassege, setErrMassege] = useState();
  let baseUrl = "https://ecommerce.routemisr.com";
  let setLogin = useNavigate();
  let initialValues = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  };
  // Yup
  let vaildYup = Yup.object({
    name: Yup.string()
      .required()
      .min(3, "name required min 3 Char ")
      .max(20, "name required max 20 Char "),
    email: Yup.string().required().email("inclued @ and .com"),
    password: Yup.string()
      .required()
      .matches(/^(?=.*?[0-9])(?=.*?[A-Za-z]).{8,32}$/, "password not matched"),
    rePassword: Yup.string()
      .required()
      .oneOf([Yup.ref("password")], "rePassword is not typical"),
    phone: Yup.string()
      .required()
      .matches(/^01[01250][0-9]{8}$/, "phone not matched"),
  });
  // useFormik
  let registerForm = useFormik({
    initialValues,
    onSubmit: registerApi,
    validationSchema: vaildYup,
  });
  // registerApi
  function registerApi(Data) {
    axios
      .post(`${baseUrl}/api/v1/auth/signup`, Data)
      .then(() => {
        setLogin("/login");
      })
      .catch((err) => {
        setErrMassege(err.response.data.message);
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
        onSubmit={registerForm.handleSubmit}
        className="max-w-xl mx-auto mt-10"
      >
        <h2 className=" font-bold text-left mb-3">Sign Up Now : </h2>
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="block mb-2 text-sm  text-start ps-2 font-medium text-gray-900 dark:text-white"
          >
            name :
          </label>
          <input
            onChange={registerForm.handleChange}
            onBlur={registerForm.handleBlur} ///// اعرف ايه بتعمل
            name="name"
            type="text"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-active focus:border-active block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-active dark:focus:border-active"
          />
          {registerForm.touched.name && registerForm.errors.name ? (
            <p className="text-red-800 text-left mb-5 ps-2 font-light ">
              {registerForm.errors.name}
            </p>
          ) : (
            ""
          )}
        </div>

        {/* Email */}
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm  text-start ps-2 font-medium text-gray-900 dark:text-white"
          >
            email :
          </label>
          <input
            onChange={registerForm.handleChange}
            onBlur={registerForm.handleBlur}
            name="email"
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-active focus:border-active block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-active dark:focus:border-active"
          />
          {registerForm.touched.email && registerForm.errors.email ? (
            <p className="text-red-800 text-left mb-5 ps-2 font-light ">
              {registerForm.errors.email}
            </p>
          ) : (
            ""
          )}
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm  text-start ps-2 font-medium text-gray-900 dark:text-white"
          >
            password :
          </label>
          <input
            onChange={registerForm.handleChange}
            onBlur={registerForm.handleBlur}
            name="password"
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-active focus:border-active block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-active dark:focus:border-active"
          />
          {registerForm.touched.password && registerForm.errors.password ? (
            <p className="text-red-800 text-left mb-5 ps-2 font-light ">
              {registerForm.errors.password}
            </p>
          ) : (
            ""
          )}
        </div>

        {/* Re - Password */}
        <div>
          <label
            htmlFor="rePassword"
            className="block mb-2 text-sm  text-start ps-2 font-medium text-gray-900 dark:text-white"
          >
            rePassword :
          </label>
          <input
            onChange={registerForm.handleChange}
            onBlur={registerForm.handleBlur}
            name="rePassword"
            type="Password"
            id="rePassword"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-active focus:border-active block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-active dark:focus:border-active"
          />
          {registerForm.touched.rePassword && registerForm.errors.rePassword ? (
            <p className="text-red-800 text-left mb-5 ps-2 font-light ">
              {registerForm.errors.rePassword}
            </p>
          ) : (
            ""
          )}
        </div>

        {/* Phone */}
        <div>
          <label
            htmlFor="phone"
            className="block mb-2 text-sm  text-start ps-2 font-medium text-gray-900 dark:text-white"
          >
            phone :
          </label>
          <input
            onChange={registerForm.handleChange}
            onBlur={registerForm.handleBlur}
            name="phone"
            type="tel"
            id="phone"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-active focus:border-active block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-active dark:focus:border-active"
          />
          {registerForm.touched.phone && registerForm.errors.phone ? (
            <p className="text-red-800 text-left  ps-2 font-light ">
              {registerForm.errors.phone}
            </p>
          ) : (
            ""
          )}
        </div>

        {/* submit */}
        <button
          disabled={!(registerForm.isValid && registerForm.dirty)}
          type="submit"
          className="text-white mt-5 disabled:opacity-20 bg-active hover:bg-active focus:ring-4 focus:outline-none focus:ring-active font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-active dark:hover:bg-active dark:focus:ring-active"
        >
          Sing Up
        </button>
      </form>
    </div>
  );
}
