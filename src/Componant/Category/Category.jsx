import React from 'react'
import useApi from '../../Hook/useApi'

export default function Category() {

  let { data, isLoading } = useApi("categories")


  return (
    <div className='flex flex-wrap'>
      {data?.data?.data?.map((category) => {
        return <div key={category} className='w-4/12 '>
          <img src={category.image} alt={category.name} className='h-96 w-full  ' />
          <h2> {category.name}</h2>
        </div>
      })}
    </div>
  )
}
