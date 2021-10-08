import React, { useEffect, useRef } from 'react';
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
import Qty from '../../Features/Qty';
import Rating from '../../Features/Rating';
import ProductSticky from './ProductSticky';

function ProductDetail(props) {
  const { product } = props;
  const ref = useRef(null);

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler);

    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, []);

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
        <Qty />
      </div>
      <div className="product__detail-action">
        <a href="/" className="btn-product btn-cart">
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
            <i class="lab la-tumblr"></i>
          </a>
        </TumblrShareButton>

        <WhatsappShareButton
          className="social-icon"
          title="Whatsapp"
          url={productDetailPath(product.slug)}
        >
          <a href="/" className="social-icon" title="Whatsapp">
            <i class="lab la-whatsapp"></i>
          </a>
        </WhatsappShareButton>

        <EmailShareButton
          className="social-icon"
          title="Pinterest"
          url={productDetailPath(product.slug)}
        >
          <a href="/" className="social-icon" title="Email">
            <i class="las la-envelope"></i>
          </a>
        </EmailShareButton>
      </div>

      <ProductSticky product={product} />
    </div>
  );
}

export default ProductDetail;
