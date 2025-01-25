import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup"
export default function VerifyResetCode() {
    let setNavigiter = useNavigate()
    let [errMassege , setErrMassege] =useState(null)
    let baseUrl = 'https://ecommerce.routemisr.com'
    let initialValues = {
        resetCode : ""
    }
    let vaildYup = Yup.object({
        resetCode : Yup.string().required("code is required").min(5,"min 5 char"),
    })
    let verifyForm = useFormik({
        initialValues,
        onSubmit: verifyApi ,
        validationSchema : vaildYup,
    })

    function verifyApi(Data){
        axios.post(`${baseUrl}/api/v1/auth/verifyResetCode`,Data).then((req)=>{
            // console.log(req)
            if (req.data.status == "Success") {
                setNavigiter("/UpdetePassword")
              }
           
        }).catch((err)=>{
            // console.log(err)
            setErrMassege(err.response.data.message)
        })
    }

  return (


    <div className="VerifyResetCode">
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
          onSubmit={verifyForm.handleSubmit}
        >
          <h1 className=" font-bold text-left mb-3">Verify Reset Code :</h1>

          {/* reset code */}
          <div className="mb-5">
            <label
              htmlFor="resetCode"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              code : 
            </label>
            <input
              onChange={verifyForm.handleChange}
              onBlur={verifyForm.handleBlur}
              name="resetCode"
              type="text"
              id="resetCode"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-active focus:border-active block w-full  p-2.5 "
            />
            {verifyForm.touched.resetCode && verifyForm.errors.resetCode ? (
              <p className="text-red-800 text-left mb-5 ps-2 font-light ">
                {verifyForm.errors.resetCode}
              </p>
            ) : (
              ""
            )}
          </div>

          {/* Login botton */}
          <button
            disabled={!(verifyForm.isValid && verifyForm.dirty)}
            type="submit"
            className="text-white mt-5 disabled:opacity-20 bg-active hover:bg-active focus:ring-4 focus:outline-none focus:ring-active font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-active dark:hover:bg-active dark:focus:ring-active"
          >
            submit
          </button>
        </form>
      </div>
    </div>
  );
}
