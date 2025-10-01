import React, { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContextProvider/CartContextProvider";
import toast, { Toaster } from "react-hot-toast";
import imgError from "../../assets/images/error.svg";

export default function Products() {
  let [page, setPage] = useState(1);
  let { addUserCart, setNumCartItem } = useContext(CartContext);

  // API function
  function getAllProducts({ queryKey }) {
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/products?page=${queryKey[1]}&limit=20`
    );
  }

  // Add to Cart
  function addCart(id) {
    addUserCart(id)
      .then((res) => {
        setNumCartItem(res.data.numOfCartItems);
        toast.success("Added to cart ✅");
      })
      .catch(() => {
        toast.error("An error occurred ❌");
      });
  }

  let { data, isLoading, isError } = useQuery({
    queryKey: ["products", page],
    queryFn: getAllProducts,
    keepPreviousData: true,
  });

  let totalPages = data?.data?.metadata?.numberOfPages || 1;

  // Loading
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <span className="loader"></span>
      </div>
    );
  }

  // Error
  if (isError) {
    return (
      <div className="flex justify-center">
        <img src={imgError} alt="error" className="w-1/2" />
      </div>
    );
  }

  return (
    <div className="w-11/12 mx-auto mb-12 container">
      <Toaster />

      <h1 className="text-3xl font-bold text-center my-8">All Products</h1>

      {/* Products */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {data?.data?.data?.map((product) => {
          let { imageCover, price, ratingsAverage, title, category, id } = product;
          return (
            <div
              key={id}
              className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition duration-300"
            >
              <Link to={`/ProductDetails/${id}`}>
                <img
                  src={imageCover}
                  alt={title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <p className="text-sm text-green-600 font-medium">
                    {category.name}
                  </p>
                  <h3 className="text-gray-800 font-semibold text-md truncate">
                    {title}
                  </h3>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-green-600 font-bold">{price} EGP</span>
                    <span className="flex items-center gap-1 text-yellow-500">
                      <i className="fa-solid fa-star"></i> {ratingsAverage}
                    </span>
                  </div>
                </div>
              </Link>
              <div className="p-4 pt-0">
                <button
                  onClick={() => addCart(id)}
                  className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        <nav
          className="inline-flex -space-x-px rounded-md shadow-sm"
          aria-label="Pagination"
        >
          {/* Previous */}
          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            className="px-3 py-2 text-sm font-medium border rounded-l-md bg-white text-gray-500 hover:bg-gray-100 disabled:opacity-50"
          >
            Previous
          </button>

          {/* Numbers */}
          {[...Array(totalPages)].map((_, i) => {
            let pageNum = i + 1;
            return (
              <button
                key={pageNum}
                onClick={() => setPage(pageNum)}
                className={`px-3 py-2 text-sm font-medium border
                  ${
                    pageNum === page
                      ? "bg-green-600 text-white"
                      : "bg-white text-gray-500 hover:bg-gray-100"
                  }`}
              >
                {pageNum}
              </button>
            );
          })}

          {/* Next */}
          <button
            disabled={page === totalPages}
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            className="px-3 py-2 text-sm font-medium border rounded-r-md bg-white text-gray-500 hover:bg-gray-100 disabled:opacity-50"
          >
            Next
          </button>
        </nav>
      </div>
    </div>
  );
}
