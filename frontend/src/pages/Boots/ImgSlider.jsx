// import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function ImgSlider({ img1, img2, img3, img4 }) {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings}>
      <div>
        <h3>{img1}</h3>
      </div>
      <div>
        <h3>{img2}</h3>
      </div>
      <div>
        <h3>{img3}</h3>
      </div>
      <div>
        <h3>{img4}</h3>
      </div>
      <div>
        <h3>5</h3>
      </div>
      <div>
        <h3>6</h3>
      </div>
    </Slider>
  );
}

export default ImgSlider;
