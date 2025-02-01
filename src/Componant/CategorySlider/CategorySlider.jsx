import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'

export default function CategorySlider() {


    let [categoryList, setCategoryList] = useState(null)
    function getAllCategory() {
        axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
            .then((req) => {
                setCategoryList(req.data.data)
                // console.log(req.data.data)
            }).catch((err) => {
                console.log(err.response.data.message)
            })
    }

    useEffect(() => {
        getAllCategory()
    }, [])

    return (
        <div>
            <Slider autoplay slidesToScroll={6} slidesToShow={6}>
                {categoryList?.map((category) => {
                    return <div key={category}>
                        <img src={category.image} alt={category.name} className='h-48 w-full object-cover ' />
                        <h2> {category.name}</h2>
                    </div>
                })}

            </Slider>
        </div>
    )
}
