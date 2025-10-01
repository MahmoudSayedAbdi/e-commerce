// src/pages/Orders/Orders.jsx
import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import OrderCard from "./OrderCard";

//  token
function getUserIdFromToken() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1])); // نفك Base64
    return payload.id; // الـ id جوا الـ payload
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
}

export default function Orders() {
  const userId = getUserIdFromToken();

  const getUserOrders = async () => {
    const res = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`
    );
    return res.data;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["orders", userId], // نخلي الكاش مربوط بالـ userId
    queryFn: getUserOrders,
    enabled: !!userId, // مينفّذش غير لو فيه userId
  });

  if (!userId) {
    return <p className="text-center text-red-500">You must be logged in ❌</p>;
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loader"></span>
      </div>
    );
  }

  if (isError) {
    return <p className="text-center text-red-500">Failed to load orders ❌</p>;
  }

  return (
    <div className="w-11/12 lg:w-9/12 mx-auto py-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">My Orders</h2>

      {data?.length > 0 ? (
        data.map((order) => <OrderCard key={order._id} order={order} />)
      ) : (
        <p className="text-gray-600">You don’t have any orders yet.</p>
      )}
    </div>
  );
}
