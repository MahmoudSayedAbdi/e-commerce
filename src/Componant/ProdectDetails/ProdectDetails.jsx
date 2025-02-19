
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { CartContext } from '../../Context/CartContextProvider/CartContextProvider'
import toast, { Toaster } from 'react-hot-toast'


export default function ProdectDetails() {

    let { id } = useParams()
    let {addUserCart} =useContext(CartContext)
    let {setNumCartItem} =useContext(CartContext)
    function diplayImage(e) {
        let ImageSrc = e.target.getAttribute("src")
        document.getElementById("mainImage").setAttribute("src", ImageSrc)
    }

    function getProdeectDetails(data){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${data.queryKey[1]}`)
    }

    let {data , isError ,isLoading ,error, isFetched} = useQuery({
        queryKey: ["prodectDetails",id],
        queryFn: getProdeectDetails
    })


    function addCart(id) {
        addUserCart(id).then((req) => {
          // console.log(req.data.numOfCartItems)
          setNumCartItem(req.data.numOfCartItems)
          toast.success('Success Add ');
        }).catch((err)=>{
        //   console.log(err)
          toast.error(err.message);
    
        })
      }


    return (

        <>
        <Toaster></Toaster>
            {isLoading ?
                <div className='flex justify-center items-center  h-screen bg-gray-300'>
                    <span className="loader "></span>
                </div>
                :
                < div className='w-10/12 mx-auto mt-20' >
                    <div className='flex items-center'>
                        <div className='w-4/12 p-5'>
                            <img id='mainImage' className='h-96' src={data?.data?.data?.imageCover} alt="" />
                            <div className='flex'>


                                {data?.data?.data?.images.map((el) => {
                                    return <div onClick={diplayImage} className='item w-full object-cover'>
                                        <img src={el} alt="" />
                                    </div>
                                })}

                                
                            </div>





                            {/* <Slider>
                {data?.data?.data?.images.map((el) => {
                    return <div className='item w-full object-cover'>
                        <img src={el} alt="" />
                    </div>
                })}
            </Slider> */}

                        </div>
                        <div className="w-8/12 ">
                            <h3 className='text-xl'>{data?.data?.data?.title}</h3>
                            <p className='text-active my-5'> {data?.data?.data?.description}</p>
                            <div className="flex justify-between">
                                <span>{data?.data?.data?.price} EGP</span>
                                <span><i className='fa-solid fa-star text-yellow-400'></i> {data?.data?.data?.ratingsAverage}</span>
                            </div>
                            <button onClick={()=>{addCart(id)}} className='btn my-2  '>add to cart</button>

                        </div>


                    </div>
                </ div >}

        </>
    )
}
