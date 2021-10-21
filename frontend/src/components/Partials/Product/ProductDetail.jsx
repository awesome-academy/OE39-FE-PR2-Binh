import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TumblrShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share';
import { productDetailPath } from '../../../utils/router';
import { addToCart } from '../../../redux/actions/cartActions';
import Qty from '../../Features/Qty';
import Rating from '../../Features/Rating';
import ProductSticky from './ProductSticky';

function ProductDetail(props) {
  const { product } = props;
  const ref = useRef(null);
  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler);

    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  const addToCartHandler = (e) => {
    e.preventDefault();
    if (product.countInStock !== 0 && product.countInStock >= qty)
      dispatch(addToCart(product.slug, qty));
  };

  function scrollHandler() {
    let sticky = ref.current.querySelector('.product__stick');
    if (sticky.classList.contains('d-none') && ref.current.getBoundingClientRect().bottom < 0) {
      sticky.classList.remove('d-none');
      return;
    }

    if (!sticky.classList.contains('d-none') && ref.current.getBoundingClientRect().bottom > 0) {
      sticky.classList.add('d-none');
    }
  }

  return (
    <div ref={ref} className="product__detail">
      <h1 className="product__title">
        <Link to={`/product/${product.slug}`}>{product.name}</Link>
      </h1>
      <div className="product__rating">
        <Rating rating={product.rating} numReviews={product.numReviews} />
      </div>
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
      <div className="product__desc">
        <p>{product.description.substring(0, 200)}...</p>
      </div>
      <div className="product__quantity-wrapper">
        <span>Qty:</span>
        <Qty changeQty={setQty} max={product.countInStock} value={qty} />
      </div>
      <div className="product__detail-action">
        <a
          href="/"
          className={`btn-product btn-cart ${product.countInStock === 0 ? 'btn-disabled' : ''}`}
          onClick={addToCartHandler}
        >
          <span>add to cart</span>
        </a>

        <a href="/" className="btn-product btn-wishlist">
          <span>Add to Wishlist</span>
        </a>
      </div>

      <div className="product__detail-footer">
        <div className="product__category w-100">
          <span>Category: </span>
          {product.categories.map((category, index) => (
            <React.Fragment key={index}>
              <Link to={`/category/${category.slug}`}>{category.name}</Link>
              {index < product.categories.length - 1 ? ', ' : ''}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="social-icons social-icons-sm">
        <span className="social-label">Share:</span>
        <FacebookShareButton
          className="social-icon"
          title="Facebook"
          url={productDetailPath(product.slug)}
        >
          <a href="/" className="social-icon" title="Facebook">
            <i className="lab la-facebook-f"></i>
          </a>
        </FacebookShareButton>

        <TwitterShareButton
          className="social-icon"
          title="Twitter"
          url={productDetailPath(product.slug)}
        >
          <a href="/" className="social-icon" title="Twitter">
            <i className="lab la-twitter"></i>
          </a>
        </TwitterShareButton>

        <LinkedinShareButton
          className="social-icon"
          title="Linkedin"
          url={productDetailPath(product.slug)}
        >
          <a href="/" className="social-icon" title="Linkedin">
            <i className="lab la-linkedin-in"></i>
          </a>
        </LinkedinShareButton>

        <TumblrShareButton
          className="social-icon"
          title="Tumblr"
          url={productDetailPath(product.slug)}
        >
          <a href="/" className="social-icon" title="Tumblr">
            <i className="lab la-tumblr"></i>
          </a>
        </TumblrShareButton>

        <WhatsappShareButton
          className="social-icon"
          title="Whatsapp"
          url={productDetailPath(product.slug)}
        >
          <a href="/" className="social-icon" title="Whatsapp">
            <i className="lab la-whatsapp"></i>
          </a>
        </WhatsappShareButton>

        <EmailShareButton
          className="social-icon"
          title="Pinterest"
          url={productDetailPath(product.slug)}
        >
          <a href="/" className="social-icon" title="Email">
            <i className="las la-envelope"></i>
          </a>
        </EmailShareButton>
      </div>

      <ProductSticky product={product} />
    </div>
  );
}

export default ProductDetail;
