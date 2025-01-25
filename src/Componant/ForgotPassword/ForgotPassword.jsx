import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import VerifyResetCode from "./VerifyResetCode";

export default function ForgotPassword() {
  // varible
  let [errMassege, setErrMassege] = useState();
  let initialValues = {
    email: "",
  };
  let [forgotDisplay, setForgotDisplay] = useState(true);
  let baseUrl = "https://ecommerce.routemisr.com";
  //   Yup
  let vaildYup = Yup.object({
    email: Yup.string().required().email("inclued @ and .com"),
  });
  //Formik
  let forgotPasswordForm = useFormik({
    initialValues,
    onSubmit: forgotPasswordApi,
    validationSchema: vaildYup,
  });
  // Function API
  function forgotPasswordApi(Data) {
    axios
      .post(`${baseUrl}/api/v1/auth/forgotPasswords`, Data)
      .then((req) => {
        // console.log(req.data.statusMsg)
        if (req.data.statusMsg == "success") {
          setForgotDisplay(false);
        }
      })
      .catch((err) => {
        setErrMassege(err.response.data.message);
        console.log(err.response.data.message);
      });
  }

  return (
    <>
    {/* Display */}
      {forgotDisplay ? (
        // send code to email
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
            onSubmit={forgotPasswordForm.handleSubmit}
          >
            <h1 className=" font-bold text-left mb-3">Forgot Password :</h1>

            {/* email */}
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
              </label>
              <input
                onChange={forgotPasswordForm.handleChange}
                onBlur={forgotPasswordForm.handleBlur}
                type="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-active focus:border-active block w-full  p-2.5 "
              />
              {forgotPasswordForm.touched.email &&
              forgotPasswordForm.errors.email ? (
                <p className="text-red-800 text-left mb-5 ps-2 font-light ">
                  {forgotPasswordForm.errors.email}
                </p>
              ) : (
                ""
              )}
            </div>
              {/* Send button  */}
            <button
              disabled={
                !(forgotPasswordForm.isValid && forgotPasswordForm.dirty)
              }
              type="submit"
              className="text-white mt-5 disabled:opacity-20 bg-active hover:bg-active focus:ring-4 focus:outline-none focus:ring-active font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-active dark:hover:bg-active dark:focus:ring-active"
            >
              Send
            </button>
          </form>
        </div>
      ) : (
        <VerifyResetCode />
      )}
    </>
  );
}
