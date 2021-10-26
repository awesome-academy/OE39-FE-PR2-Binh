import React, { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../../../redux/actions/cartActions';
import Qty from '../../Features/Qty';

function ProductSticky(props) {
  const [qty, setQty] = useState(1);
  const { product } = props;
  const dispatch = useDispatch();

  function addToCartHandler(e) {
    e.preventDefault();
    dispatch(addToCart(product.slug, qty));
  }

  return (
    <div className="product__stick d-none">
      <div className="container">
        <div className="row">
          <div className="col-6">
            <figure className="product__media">
              <Link to={`/product/${product.slug}`}>
                <LazyLoadImage
                  alt={product.name}
                  src={product.images[0]}
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
            ) : product.salePrice && product.salePrice >= 0 ? (
              <div className="product__price">
                <span className="product__price-new">${product.salePrice.toFixed(2)}</span>
                <span className="product__price-old">${product.price.toFixed(2)}</span>
              </div>
            ) : (
              <div className="product__price">${product.price.toFixed(2)}</div>
            )}

            <Qty changeQty={setQty} max={product.countInStock} value={qty} />

            <div className="product__detail-action">
              <a
                href="/"
                className={`btn-product btn-cart ${
                  product.countInStock === 0 ? 'btn-disabled' : ''
                }`}
                onClick={addToCartHandler}
              >
                <span>add to cart</span>
              </a>
              <Link to="/" className="btn-product btn-wishlist"></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductSticky;
