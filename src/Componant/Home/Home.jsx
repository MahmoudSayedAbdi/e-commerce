import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import MainSlider from '../MainSlider/MainSlider'
import CategorySlider from '../CategorySlider/CategorySlider'
import { CartContext } from '../../Context/CartContextProvider/CartContextProvider'
import toast, { Toaster } from 'react-hot-toast'
import imgErrer from "../../assets/images/error.svg"

export default function Home() {
  let [numberOfPages, setNumberOfPages] = useState(1)
  let { addUserCart, setNumCartItem } = useContext(CartContext)

  // API
  function getAllProdect({ queryKey }) {
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/products?page=${queryKey[1]}&limit=20`
    )
  }

  // add to cart
  function addCart(id) {
    addUserCart(id)
      .then((req) => {
        setNumCartItem(req.data.numOfCartItems)
        toast.success('Added to cart ✅')
      })
      .catch(() => {
        toast.error("An error occurred ❌")
      })
  }

  let { data, isLoading, isError } = useQuery({
    queryKey: ["products", numberOfPages],
    queryFn: getAllProdect,
    keepPreviousData: true
  })

  let totalPages = data?.data?.metadata?.numberOfPages || 1

  // Loading
  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-screen bg-gray-50'>
        <span className="loader"></span>
      </div>
    )
  }

  // Error
  if (isError) {
    return (
      <div className='flex justify-center'>
        <img src={imgErrer} alt="error" className="w-1/2" />
      </div>
    )
  }

  return (
    <div className='w-11/12 mx-auto mb-12 container'>
      <Toaster />

      {/* Hero Section */}
      <MainSlider />

      {/* Categories Slider */}
      <div className="my-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Shop by Category</h2>
        <CategorySlider />
      </div>

      {/* Who We Are Section */}
      <section className="bg-gray-50 py-12 rounded-xl my-10 shadow-sm">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-green-600 mb-4">Who We Are</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            We are an online store that provides high-quality products at the best prices.
            Our mission is to deliver trust, quality, and convenience to your shopping experience.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid gap-6 grid-cols-1 md:grid-cols-3 my-12">
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <i className="fa-solid fa-truck-fast text-green-600 text-3xl mb-3"></i>
          <h3 className="font-semibold text-lg">Fast Delivery</h3>
          <p className="text-gray-600">We deliver your products quickly and safely.</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <i className="fa-solid fa-shield-halved text-green-600 text-3xl mb-3"></i>
          <h3 className="font-semibold text-lg">Secure Shopping</h3>
          <p className="text-gray-600">Your transactions are always safe with us.</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <i className="fa-solid fa-headset text-green-600 text-3xl mb-3"></i>
          <h3 className="font-semibold text-lg">24/7 Support</h3>
          <p className="text-gray-600">Our support team is always here for you.</p>
        </div>
      </section>

      {/* Products (limit to 6 only) */}
      <div className="my-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Featured Products</h2>
        <div className='grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3'>
          {data?.data?.data?.slice(0, 6).map((product) => {
            let { imageCover, price, ratingsAverage, title, category, id } = product
            return (
              <div key={id} className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition duration-300">
                <Link to={`/ProductDetails/${id}`}>
                  <img src={imageCover} alt={title} className='w-full h-48 object-cover' />
                  <div className="p-4">
                    <p className="text-sm text-green-600 font-medium">{category.name}</p>
                    <h3 className="text-gray-800 font-semibold text-md truncate">{title}</h3>
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
            )
          })}
        </div>
      </div>

      {/* Pagination (optional - keep if you want) */}
      <div className="flex justify-center mt-8">
        <nav className="inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
          <button
            disabled={numberOfPages === 1}
            onClick={() => setNumberOfPages((prev) => Math.max(prev - 1, 1))}
            className="px-3 py-2 text-sm font-medium border rounded-l-md bg-white text-gray-500 hover:bg-gray-100 disabled:opacity-50"
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, i) => {
            let page = i + 1
            return (
              <button
                key={page}
                onClick={() => setNumberOfPages(page)}
                className={`px-3 py-2 text-sm font-medium border
                  ${page === numberOfPages
                    ? "bg-green-600 text-white"
                    : "bg-white text-gray-500 hover:bg-gray-100"}`}
              >
                {page}
              </button>
            )
          })}
          <button
            disabled={numberOfPages === totalPages}
            onClick={() => setNumberOfPages((prev) => Math.min(prev + 1, totalPages))}
            className="px-3 py-2 text-sm font-medium border rounded-r-md bg-white text-gray-500 hover:bg-gray-100 disabled:opacity-50"
          >
            Next
          </button>
        </nav>
      </div>
    </div>
  )
}
