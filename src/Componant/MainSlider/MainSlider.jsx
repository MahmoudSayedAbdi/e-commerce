import React from "react";
import Slider from "react-slick";
import img1 from '../../assets/images/slider-image-1.jpeg'
import img2 from '../../assets/images/slider-image-2.jpeg'
import img3 from '../../assets/images/slider-image-3.jpeg'
export default function MainSlider() {
  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    infinite : true,
    autoplay :true
  };
  return (
<>
<div className="flex ">
<div className=" w-9/12 ">
      <Slider {...settings}  >
        <div>
          <img className="w-full h-96" src={img1} alt="" />
        </div>
        <div>
          <img  className="w-full h-96" src={img2} alt="" />
        </div>
        <div>
          <img className="w-full h-96" src={img3} alt="" />
        </div>
      </Slider>
    </div>
    <div className="w-3/12 "> 
        <img className="w-full h-48" src={img1} alt="" />
        <img className="w-full h-48" src={img2} alt="" />
    </div>
</div>
</>
  );
}