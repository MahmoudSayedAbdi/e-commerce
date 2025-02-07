import { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../Context/CartContextProvider/CartContextProvider.jsx'
export default function Cart() {

  let { getUserCart } = useContext(CartContext);
  let [CartData, setCartData] = useState(null)
  let [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getCartData()
  }, [])


  function getCartData() {
    setIsLoading(true)
    getUserCart().then((req) => {
      console.log(req.data.data)
      setCartData(req?.data?.data)
      setIsLoading(false)
    }).catch((err) => {
      console.log(err)
      setIsLoading(false)

    })
  }


  if (isLoading) {
    return <div className='flex justify-center items-center  h-screen bg-gray-300'>
      <span className="loader "></span>
    </div>
  }



  return (
    <>
      {CartData?.products?.length > 0 ?
        <div className='w-10/12 mx-auto  '>
          <div className='bg-slate-300 '>
            <h2 className='text-3xl'>Shop Cart</h2>
            <h2 className=' pt-2 pb-5 text-active text-xl'>Total Cart Price : {CartData?.totalCartPrice} Egy</h2>
            <div className=' divide-y-4 divide-slate-400 border-4 border-slate-400'>
              {CartData?.products?.map((item) => {
                return <>
                  <div key={item._id} className="flex flex-wrap items-center gap-y-5 ">
                    <div className="w-2/12">
                      <img src={item.product.imageCover} className='w-full p-2' alt="" />
                    </div>
                    <div className='w-9/12 '>
                      <h2>{item.product.title}</h2>
                      <h3 className='text-active'> Price : {item.price} EGY</h3>
                      <button className='text-red-700 me-auto  border p-2 rounded hover:bg-red-700 hover:text-white border-red-700'>
                        <i class="fa-regular fa-trash-can mr-2"></i>
                        Remove
                      </button>
                    </div>
                    <div className="w-1/12 ">
                      <i class="fa-solid border rounded hover:bg-active hover:text-white  border-active p-1 mx-2 fa-plus"></i>
                      <span>{item.count}</span>
                      <i class="fa-solid border rounded hover:bg-active hover:text-white  border-active p-1 mx-2 fa-minus"></i>
                    </div>
                  </div>

                </>
              })}


            </div>
          </div>
        </div>
        :
        <h4 className='text-center bg-red-600 text-white'>no data</h4>
      }
    </>

  )
}
