import React from 'react';
import Slider from 'react-slick';

function SlickCarousel(props) {
  const { adClass, options } = props;
  const defaultOptions = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplaySpeed: 3000,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  let settings = Object.assign({}, defaultOptions, options);

  return (
    <Slider className={adClass} {...settings}>
      {props.children}
    </Slider>
  );
}

export default SlickCarousel;
