import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import MainSlider from '../MainSlider/MainSlider'
import CategorySlider from '../CategorySlider/CategorySlider'

export default function Home() {

  let [numberOfPages, setNumberOfPages] = useState(1)
  // let [NumPage , setNumPage]= useState(1)

  function getAllProdect(data) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products?page=${data.queryKey[1]}&limit=20`)
  }

  let { data, isLoading, isError, error } = useQuery({
    queryKey: ["prodects", numberOfPages],
    queryFn: getAllProdect
  })

  // console.log(data?.data?.metadata?.numberOfPages);

  let num = []
  for (let i = 1; i <= data?.data?.metadata?.numberOfPages; i++) {
    num.push(i)
  }

  if (isLoading) {
    return <div className='flex justify-center items-center  h-screen bg-gray-300'>
      <span className="loader "></span>
    </div>
  }
  if (isError) {
    return <h1>{error}</h1>
  }

  return (
    <>
      <div className='w-10/12 mx-auto'>
        <MainSlider></MainSlider>
        <CategorySlider></CategorySlider>

        {/* prodect */}
        <div className='flex flex-wrap justify-center'>
          {data?.data?.data?.map((prodect) => {
            let { imageCover, price, ratingsAverage, title, category } = prodect
            let { name } = category
            return <>
              <div key={prodect} className='lg:w-2/12  md:w-3/12 sm:w-6/12 w-full  px-2 m-2'>
                <Link to={`/ProdectDetails/${prodect.id}`}>

                  <div className="item hover:border duration-100 hover:border-active group rounded overflow-hidden p-2">

                    <img src={imageCover} alt={title} className='w-full' />
                    <p className='text-active'> {name}</p>
                    <h3>{title.split(" ").slice(0, 2).join(" ")}</h3>
                    <div className="flex justify-between">
                      <span>{price} EGP</span>
                      <span><i className='fa-solid fa-star text-yellow-400'></i> {ratingsAverage}</span>
                    </div>
                    <button className='btn my-2  translate-y-20 duration-500 group-hover:translate-y-0'>add to cart</button>

                  </div>
                </Link>
              </div>
            </>
          })}


        </div>

        {/* Pagenation */}
        <nav aria-label="Page navigation example ">
          <ul className="flex items-center justify-center -space-x-px h-8 text-sm">
            <li>
              <a href="#" className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                <span className="sr-only">Previous</span>
                <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4" />
                </svg>
              </a>
            </li>
            {num?.map((page) => {
              return <li key={page} onClick={() => { setNumberOfPages(page) }}>
                <a className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{page}</a>
              </li>
            })}


            <li>
              <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                <span className="sr-only">Next</span>
                <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                </svg>
              </a>
            </li>
          </ul>
        </nav>



      </div>
    </>
  )
}

















// import React, { useEffect, useState } from 'react'
// import MainSlider from '../MainSlider/MainSlider'
// import axios from 'axios'
// import CategorySlider from '../CategorySlider/CategorySlider'
// import { Link } from 'react-router-dom'
// export default function Home() {

//   let [prodectList, setProdectList] = useState(null)
//   let [numberOfPages, setNumberOfPages] = useState(null)
//   let [loading, setLoading] = useState(true)
//   function getAllProdect(page = 1) {
//     axios.get(`https://ecommerce.routemisr.com/api/v1/products?limit=20&page=${page}`)
//       .then((req) => {
//         setLoading(true)
//         setProdectList(req.data.data)
//         // console.log(req.data.metadata.numberOfPages)
//         // console.log(req.data.data)
//         let num = []
//         for (let i = 0; i <= req.data.metadata.numberOfPages; i++) {
//           num.push(i)
//         }
//         setNumberOfPages(num)
//         setLoading(false)
//       }).catch((err) => {
//         console.log(err)
//         setLoading(false)
//       })
//   }

//   useEffect(() => {
//     getAllProdect()
//   }, [])

//   function getPageNumber(el) {
//     getAllProdect(el.target.getAttribute("page"))
//   }

//   return (
//     <>
//       {loading ?
//         <div className='flex justify-center items-center  h-screen bg-gray-300'>
//           <span className="loader "></span>
//         </div> :
//         <div className='mx-auto lg:w-10/12  w-full '>
//           <MainSlider />
//           <CategorySlider />
//           <div className='flex flex-wrap justify-center'>
//             {prodectList?.map((prodect) => {
//               let { imageCover, price, ratingsAverage, title, category } = prodect
//               let { name } = category
//               return <>
//                 <div key={prodect} className='lg:w-2/12  md:w-3/12 sm:w-6/12 w-full  px-2 m-2'>
//                   <Link to={`/ProdectDetails/${prodect.id}`}>

//                     <div className="item hover:border duration-100 hover:border-active group rounded overflow-hidden p-2">

//                       <img src={imageCover} alt={title} className='w-full' />
//                       <p className='text-active'> {name}</p>
//                       <h3>{title.split(" ").slice(0, 2).join(" ")}</h3>
//                       <div className="flex justify-between">
//                         <span>{price} EGP</span>
//                         <span><i className='fa-solid fa-star text-yellow-400'></i> {ratingsAverage}</span>
//                       </div>
//                       <button className='btn my-2  translate-y-20 duration-500 group-hover:translate-y-0'>add to cart</button>

//                     </div>
//                   </Link>
//                 </div>
//               </>
//             })}


//           </div>





// <nav aria-label="Page navigation example ">
//   <ul className="flex items-center justify-center -space-x-px h-8 text-sm">
//     <li>
//       <a href="#" className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
//         <span className="sr-only">Previous</span>
//         <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
//           <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4" />
//         </svg>
//       </a>
//     </li>
//     {numberOfPages?.map((page) => {
//       return <li key={page} onClick={getPageNumber}>
//         <a page={page} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{page}</a>
//       </li>
//     })}


//     <li>
//       <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
//         <span className="sr-only">Next</span>
//         <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
//           <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
//         </svg>
//       </a>
//     </li>
//   </ul>
// </nav>



//         </div>}



//     </>
//   )
// }

