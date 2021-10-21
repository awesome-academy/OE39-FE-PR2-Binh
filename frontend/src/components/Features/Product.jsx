import React from 'react';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Rating from './Rating';
import { renderBaseUrl } from '../../utils/router';

function Product({ product }) {
  return (
    <div className="product">
      <figure className="product__media">
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

        <Link to={`/product/${product.slug}`}>
          <LazyLoadImage
            alt={product.name}
            src={renderBaseUrl(product.images[0].url)}
            threshold={500}
            effect="black and white"
            wrapperClassName="product__image"
          />

          {product.images.length >= 2 ? (
            <LazyLoadImage
              alt={product.name}
              src={renderBaseUrl(product.images[1].url)}
              threshold={500}
              effect="black and white"
              wrapperClassName="product__image-hover"
            />
          ) : (
            ''
          )}
        </Link>

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
          {product.categories.map((category, index) => (
            <React.Fragment key={index}>
              <Link to={`/category/${category.slug}`}>{category.name}</Link>
              {index < product.categories.length - 1 ? ', ' : ''}
            </React.Fragment>
          ))}
        </div>
        <h3 className="product__title">
          <Link to={`/product/${product.slug}`}>{product.name}</Link>
        </h3>

        {product.countInStock === 0 ? (
          <div className="product__price">
            <span className="product__price-out">${product.price.toFixed(2)}</span>
          </div>
        ) : product.salePrice >= 0 ? (
          <div className="product__price">
            <span className="product__price-new">${product.salePrice.toFixed(2)}</span>
            <span className="product__price-old">${product.price.toFixed(2)}</span>
          </div>
        ) : (
          <div className="product__price">${product.price.toFixed(2)}</div>
        )}

        <div className="product__rating">
          <Rating rating={product.rating} numReviews={product.numReviews} />
        </div>
      </div>
    </div>
  );
}

export default Product;
