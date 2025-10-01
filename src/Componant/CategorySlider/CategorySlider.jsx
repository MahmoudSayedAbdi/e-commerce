import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";

export default function CategorySlider() {
  const [categoryList, setCategoryList] = useState([]);

  function getAllCategory() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then((req) => {
        setCategoryList(req.data.data);
      })
      .catch((err) => {
        console.log(err.response?.data?.message || err.message);
      });
  }

  useEffect(() => {
    getAllCategory();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 1500,
    autoplaySpeed: 2500,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1280, // xl
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 1024, // lg
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768, // md
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 640, // sm
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <div className="my-10">
      <Slider {...settings}>
        {categoryList?.map((category) => (
          <div key={category._id} className="px-2">
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
              <img
                src={category.image}
                alt={category.name}
                className="h-40 w-full object-cover"
              />
              <h2 className="text-center py-2 font-medium text-gray-700">
                {category.name}
              </h2>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
