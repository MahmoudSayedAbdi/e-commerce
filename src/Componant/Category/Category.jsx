import React from 'react'
import useApi from '../../Hook/useApi'

export default function Category() {
  let { data, isLoading } = useApi("categories")

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loader"></span>
      </div>
    )
  }

  return (
    <div className='container grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-10 w-10/12 mx-auto'>
      {data?.data?.data?.map((category) => {
        return (
          <div
            key={category._id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300"
          >
            {/* Image wrapper with fixed aspect ratio */}
            <div className="aspect-square w-full">
              <img
                src={category.image}
                alt={category.name}
                className='w-full h-full object-cover'
              />
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800 text-center">
                {category.name}
              </h2>
            </div>
          </div>
        )
      })}
    </div>
  )
}
