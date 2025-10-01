import React from "react";
import Slider from "react-slick";
import img1 from "../../assets/images/slider-image-1.jpeg";
import img2 from "../../assets/images/slider-image-2.jpeg";
import img3 from "../../assets/images/slider-image-3.jpeg";

export default function MainSlider() {
  const settings = {
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    cssEase: "ease-in-out",
    dots: true,
    appendDots: dots => (
      <div>
        <ul className="flex justify-center gap-2 mt-2">{dots}</ul>
      </div>
    ),
    customPaging: () => (
      <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
    )
  };

  return (
    <div className="flex flex-col lg:flex-row gap-2">
      {/* Main slider */}
      <div className="w-full lg:w-9/12 rounded-xl overflow-hidden shadow-md">
        <Slider {...settings}>
          {[img1, img2, img3].map((img, i) => (
            <div key={i}>
              <img
                className="w-full h-64 lg:h-96 object-cover rounded-xl"
                src={img}
                alt={`slider-${i}`}
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* Side images */}
      <div className="w-full lg:w-3/12 flex flex-col gap-2">
        <img
          className="w-full h-32 lg:h-48 object-cover rounded-xl shadow-md"
          src={img1}
          alt="side-1"
        />
        <img
          className="w-full h-32 lg:h-48 object-cover rounded-xl shadow-md"
          src={img2}
          alt="side-2"
        />
      </div>
    </div>
  );
}
