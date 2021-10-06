import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Rating from './Rating';

function Product(props) {
  return (
    <div className="product">
      <figure className="product__media">
        <span className="product__label product__label--circle product__label--new">New</span>
        <span className="product__label product__label--circle product__label--sale">Sale</span>
        <span className="product__label product__label--circle product__label--top">Top</span>
        <span className="product__label product__label--circle product__label--out">Out</span>

        <a href="/">
          <LazyLoadImage
            alt="product"
            src="images/products/product_2_1.jpg"
            threshold={500}
            effect="black and white"
            wrapperClassName="product__image"
          />
        </a>

        <div className="product__action-vertical">
          <a href="/" className="btn-product-icon btn-wishlist btn-expandable">
            <span>go to wishlist</span>
          </a>

          <a href="/" className="btn-product-icon btn-quickview btn-expandable">
            <span>quick view</span>
          </a>
        </div>

        <div className="product__action">
          <a href="/" className="btn-product btn-cart">
            <span>add to cart</span>
          </a>
        </div>

        <div className="lazy-overlay"></div>
      </figure>

      <div className="product__body">
        <div className="product__category">
          <a href="/">Furniture</a>, <a href="/">Interior</a>
        </div>
        <h3 className="product__title">
          <a href="/">Roots Sofa Bed</a>
        </h3>
        <div className="product__price">
          <span className="product__price-new">$500</span>
          <span className="product__price-old">$600</span>
        </div>
        <div className="product__rating">
          <Rating rating={4} numReviews={6} />
        </div>
      </div>
    </div>
  );
}

export default Product;
