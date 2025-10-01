import React from 'react';
import useApi from '../../Hook/useApi';

/**
 * Brand Component
 * Displays a list of brands with professional design, loading state, and error handling
 * @returns {JSX.Element} Brand component with grid layout
 */
export default function Brand() {
  const { data, isLoading, error } = useApi("brands");

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading brands...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg max-w-md">
          <div className="flex items-center mb-2">
            <svg className="h-6 w-6 text-red-500 ml-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <h3 className="text-red-800 font-bold text-lg">Error Occurred</h3>
          </div>
          <p className="text-red-700">Sorry, an error occurred while loading brands. Please try again.</p>
        </div>
      </div>
    );
  }

  const brands = data?.data?.data || [];

  if (brands.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <svg className="h-24 w-24 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <h3 className="text-gray-700 text-xl font-semibold mb-2">No Brands Found</h3>
          <p className="text-gray-500">There are no brands available at the moment</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Featured Brands
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-green-600 to-green-700 mx-auto rounded-full"></div>
          <p className="text-gray-600 mt-4 text-lg">
            Discover our curated collection of premium brands
          </p>
        </div>

        {/* شبكة البراندات */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {brands.map((brand, index) => (
            <div
              key={brand._id || brand.id || index}
              className="group bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              {/* Brand Image */}
              <div className="relative h-56 overflow-hidden bg-gray-200">
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Brand Information */}
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-green-600 transition-colors duration-300">
                  {brand.name}
                </h2>

                {brand.description && (
                  <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                    {brand.description}
                  </p>
                )}

                <button className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-lg font-semibold transform transition-all duration-300 hover:from-green-700 hover:to-green-800 active:scale-95 shadow-md hover:shadow-lg">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* عداد البراندات */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 text-lg">
            عدد البراندات: <span className="font-bold text-green-600">{brands.length}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
