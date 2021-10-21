import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import Qty from '../../Features/Qty';

function ProductSticky(props) {
  const { product } = props;
  return (
    <div className="product__stick d-none">
      <div className="container">
        <div className="row">
          <div className="col-6">
            <figure className="product__media">
              <Link to={`/product/${product.slug}`}>
                <LazyLoadImage
                  alt={product.name}
                  src={`${process.env.REACT_APP_BASE_URL}/${product.images[0].url}`}
                  threshold={500}
                  effect="black and white"
                  wrapperClassName="product__image"
                />
              </Link>
            </figure>
            <h3 className="product__title">
              <Link to={`/product/${product.slug}`}>{product.name}</Link>
            </h3>
          </div>
          <div className="col-6 justify-content-end">
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

            <Qty />

            <div className="product__detail-action">
              <a href="/" className="btn-product btn-cart">
                <span>add to cart</span>
              </a>
              <a href="/" className="btn-product btn-wishlist"></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductSticky;
