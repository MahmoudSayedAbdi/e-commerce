import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContextProvider/CartContextProvider.jsx";
import { Toaster } from "react-hot-toast";

export default function Cart() {
  const {
    getUserCart,
    removeCartItem,
    clearCartItem,
    setNumCartItem,
    updateCartItemCount,
  } = useContext(CartContext);

  const [CartData, setCartData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCartData();
  }, []);

  const getCartData = async () => {
    setIsLoading(true);
    try {
      const req = await getUserCart();
      setCartData(req.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const removeItem = (id) => {
    removeCartItem(id)
      .then((req) => {
        if (req.data.status === "success") {
          setNumCartItem(req.data.numOfCartItems);
          setCartData(req.data.data);
        }
      })
      .catch((err) => console.log(err));
  };

  const clearItems = async () => {
    try {
      const req = await clearCartItem();
      setCartData(req.data.data);
      setNumCartItem(req.data.numOfCartItems);
    } catch (err) {
      console.error(err);
    }
  };

  function updateCartItem(id, count) {
    if (count < 1) return;
    updateCartItemCount(id, count)
      .then((req) => {
        setCartData(req.data.data);
        setNumCartItem(req.data.numOfCartItems);
      })
      .catch((err) => console.error(err));
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <>
      <Toaster />
      {CartData?.products?.length > 0 ? (
        <div className="w-11/12 lg:w-9/12 mx-auto my-10">
          <div className="bg-white p-8 shadow-xl rounded-2xl border border-gray-100">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
              <div>
                <h2 className="text-3xl font-extrabold text-gray-800">
                  Shopping Cart
                </h2>
                <h2 className="text-lg text-gray-600 mt-2">
                  Total:{" "}
                  <span className="font-bold text-green-600 text-xl">
                    {CartData?.totalCartPrice} EGY
                  </span>
                </h2>
              </div>
              <button
                onClick={clearItems}
                className="mt-4 sm:mt-0 px-5 py-2 rounded-xl border border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-medium transition"
              >
                Clear Cart
              </button>
            </div>

            {/* Items */}
            <div className="space-y-6">
              {CartData?.products?.map((item) => (
                <div
                  key={item._id}
                  className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center bg-gray-50 p-4 rounded-xl hover:shadow-md transition"
                >
                  {/* Image */}
                  <div className="sm:col-span-2">
                    <img
                      src={item.product.imageCover}
                      className="w-full h-28 object-contain rounded-lg border border-gray-200 shadow-sm bg-white"
                      alt={item.product.title}
                    />
                  </div>

                  {/* Info */}
                  <div className="sm:col-span-7">
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">
                      {item.product.title}
                    </h2>
                    <p className="text-gray-600 mb-4">
                      Price:{" "}
                      <span className="font-medium text-green-600">
                        {item.price} EGY
                      </span>
                    </p>
                    <button
                      onClick={() => removeItem(item.product._id)}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition font-medium"
                    >
                      <i className="fa-regular fa-trash-can"></i> Remove
                    </button>
                  </div>

                  {/* Quantity */}
                  <div className="sm:col-span-3 flex items-center justify-center sm:justify-end gap-4">
                    <button
                      onClick={() =>
                        updateCartItem(item.product._id, item.count + 1)
                      }
                      className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 hover:bg-green-500 hover:text-white transition"
                    >
                      <i className="fa-solid fa-plus"></i>
                    </button>
                    <span className="text-gray-800 font-semibold text-lg">
                      {item.count}
                    </span>
                    <button
                      onClick={() =>
                        updateCartItem(item.product._id, item.count - 1)
                      }
                      className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 hover:bg-red-500 hover:text-white transition"
                    >
                      <i className="fa-solid fa-minus"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <h4 className="text-center py-10 text-lg font-medium text-gray-500">
          Your cart is empty
        </h4>
      )}
    </>
  );
}
