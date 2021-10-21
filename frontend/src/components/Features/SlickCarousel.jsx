import React, { useEffect, useRef } from 'react';
import Slider from 'react-slick';

function SlickCarousel(props) {
  const { adClass, options } = props;
  const slickRef = useRef(null);
  const defaultOptions = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplaySpeed: 3000,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useEffect(() => {
    if (props.onSlickRef) {
      props.onSlickRef(slickRef);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slickRef]);

  let settings = Object.assign({}, defaultOptions, options);

  return (
    <Slider ref={slickRef} className={adClass} {...settings}>
      {props.children}
    </Slider>
  );
}

export default SlickCarousel;
