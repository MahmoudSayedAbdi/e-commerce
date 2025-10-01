import React from "react";

export default function OrderCard({ order }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 mb-6 border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-800">
          Order #{order.id || order._id}
        </h3>
        <span
          className={`px-3 py-1 rounded-full text-sm ${
            order.isDelivered ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-600"
          }`}
        >
          {order.isDelivered ? "Delivered" : "Pending"}
        </span>
      </div>

      <p className="text-gray-600">
        <strong>Total Price:</strong> {order.totalOrderPrice} EGP
      </p>
      <p className="text-gray-600">
        <strong>Payment Method:</strong> {order.paymentMethodType}
      </p>

      {/* Products */}
      <div className="mt-4">
        <h4 className="text-gray-700 font-semibold mb-2">Products:</h4>
        <ul className="space-y-2">
          {order.cartItems?.map((item) => (
            <li
              key={item._id}
              className="flex items-center gap-4 border-b pb-2"
            >
              <img
                src={item.product.imageCover}
                alt={item.product.title}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <p className="font-medium text-gray-800">{item.product.title}</p>
                <p className="text-sm text-gray-600">
                  Qty: {item.count} × {item.price} EGP
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
