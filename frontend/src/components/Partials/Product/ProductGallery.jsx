import React, { useEffect, useState } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { SideBySideMagnifier } from 'react-image-magnifiers';
import SlickCarousel from '../../Features/SlickCarousel';

function ProductGallery(props) {
  const { product, adClass } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [photoMain, setPhotoMain] = useState(0);
  const [photoIndex, setPhotoIndex] = useState(0);

  const [slickRef, setSlickRef] = useState(null);

  function changeImage(index) {
    setPhotoMain(index);
    setPhotoIndex(index);
  }

  useEffect(() => {
    slickRef && slickRef.current && slickRef.current.slickGoTo(photoMain);
  }, [slickRef, photoMain]);

  return (
    <>
      <div className={`product__gallery ${adClass || ''}`}>
        <figure className="product__image-main">
          {product.isNew ? (
            <span className="product__label product__label--circle product__label--new">New</span>
          ) : (
            ''
          )}

          {product.salePrice ? (
            <span className="product__label product__label--circle product__label--sale">Sale</span>
          ) : (
            ''
          )}

          {product.isTop ? (
            <span className="product__label product__label--circle product__label--top">Top</span>
          ) : (
            ''
          )}

          {product.countInStock === 0 ? (
            <span className="product__label product__label--circle product__label--out">Out</span>
          ) : (
            ''
          )}

          <SlickCarousel options={{ dots: false }} onSlickRef={setSlickRef}>
            {product.images.map((image, index) => (
              <SideBySideMagnifier
                key={index}
                alwaysInPlace={true}
                imageAlt="Product"
                imageSrc={image}
                largeImageSrc={image}
              />
            ))}
          </SlickCarousel>

          <button
            id="btn-product-gallery"
            className="btn-product-gallery"
            onClick={() => setIsOpen(true)}
          >
            <i className="las la-expand-arrows-alt"></i>
          </button>
        </figure>
        <div className="product__image-list">
          {product.images.map(
            (image, index) =>
              index < 3 && (
                <button
                  key={index}
                  onClick={() => changeImage(index)}
                  className={`product__image-item ${photoMain === index ? 'active' : ''}`}
                >
                  <div className="img-wrapper">
                    <img src={image} alt="Product" />
                  </div>
                </button>
              )
          )}

          {product.images.length > 3 && (
            <button onClick={() => changeImage(3)} className={`product__image-item more `}>
              <div className="img-wrapper">
                <img src={product.images[3]} alt="Product" />
                <span>{`See more ${product.images.length - 2} pictures`}</span>
              </div>
            </button>
          )}
        </div>
      </div>

      {isOpen && (
        <Lightbox
          mainSrc={product.images[photoIndex]}
          nextSrc={product.images[(photoIndex + 1) % product.images.length]}
          prevSrc={product.images[(photoIndex + product.images.length - 1) % product.images.length]}
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() =>
            setPhotoIndex((photoIndex + product.images.length - 1) % product.images.length)
          }
          onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % product.images.length)}
        />
      )}
    </>
  );
}

export default ProductGallery;
