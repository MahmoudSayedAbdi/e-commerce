import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../Context/CartContextProvider/CartContextProvider.jsx';
import { Toaster } from 'react-hot-toast';

export default function Cart() {
  const { getUserCart, removeCartItem, clearCartItem, setNumCartItem, updateCartItemCount } = useContext(CartContext);
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
    removeCartItem(id).then((req) => {
      if (req.data.status === 'success') {
        setNumCartItem(req.data.numOfCartItems);
        setCartData(req.data.data);
      }
    }).catch((err) => {
      console.log(err)
    })


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

  // const updateCartItem = async (id, count) => {
  //   try {
  //     const req = await updateCartItemCount(id, count);
  //     setCartData(req.data.data);
  //     setNumCartItem(req.data.numOfCartItems);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  function updateCartItem(id, count) {  
    updateCartItemCount(id, count).then((req) => {
      setCartData(req.data.data);
      setNumCartItem(req.data.numOfCartItems);
    }).catch((err) => {
      console.error(err);
    }); 

  }



  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-screen bg-gray-200 '>
        <span className='loader'></span>
      </div>
    );
  }

  return (
    <>
      <Toaster />
      {CartData?.products?.length > 0 ? (
        <div className='w-11/12 lg:w-10/12 mx-auto mb-6 mt-6'>
          <div className='bg-white p-4 shadow-md rounded-md'>
            <h2 className='text-3xl px-3 text-gray-800'>Shop Cart</h2>
            <h2 className='pt-2 pb-5 px-3 text-active text-xl'>Total Cart Price: {CartData?.totalCartPrice} EGY</h2>
            <button onClick={clearItems} className='px-3 rounded border-active border mb-3 ms-3 hover:bg-active hover:text-white'>
              Clear
            </button>
            <div className='divide-y divide-gray-300'>
              {CartData?.products?.map((item) => (
                <div key={item._id} className='flex flex-wrap items-center gap-y-5 border-b border-gray-300'>
                  <div className='w-full sm:w-2/12'>
                    <img src={item.product.imageCover} className='w-full p-2' alt={item.product.title} />
                  </div>
                  <div className='w-full sm:w-8/12 p-3'>
                    <h2 className='text-gray-800'>{item.product.title}</h2>
                    <h3 className='text-active'>Price: {item.price} EGY</h3>
                    <button
                      onClick={() => removeItem(item.product._id)}
                      className='text-red-600 me-auto border p-2 rounded hover:bg-red-600 hover:text-white border-red-600'
                    >
                      <i className='fa-regular fa-trash-can mr-2'></i>
                      Remove
                    </button>
                  </div>
                  <div className='w-full sm:w-2/12 flex justify-center sm:justify-start pb-3'>
                    <i
                      onClick={() => updateCartItem(item.product._id, item.count + 1)}
                      className='fa-solid border cursor-pointer rounded hover:bg-active hover:text-white border-active p-1 mx-2 fa-plus'
                    ></i>
                    <span>{item.count}</span>
                    <i
                      onClick={() => updateCartItem(item.product._id, item.count - 1)}
                      className='fa-solid border cursor-pointer rounded hover:bg-active hover:text-white border-active p-1 mx-2 fa-minus'
                    ></i>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <h4 className='text-center bg-red-600 text-white'>No data</h4>
      )}
    </>
  );
}
