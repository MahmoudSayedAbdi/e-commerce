import React from 'react'
import useApi from '../../Hook/useApi'

export default function Brand() {


  let { data, isLoading } = useApi("brands")
  return (
    <div className='flex flex-wrap my-6 w-10/12 ms-auto'>
      {data?.data?.data?.map((brand) => {
        return <div key={brand} className='w-3/10'>
          <img src={brand.image} alt={brand.name} className='h-48 w-full object-cover ' />
          <h2> {brand.name}</h2>
        </div>
      })}
    </div>
  )
}
