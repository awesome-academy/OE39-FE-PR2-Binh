import React from 'react';

function CartMenu(props) {
  return (
    <div className="header__cart">
      <a href="/" className="header__cart-icon">
        <i className="las la-shopping-cart"></i>
        <span className="header__cart-count">2</span>
      </a>
      <div className="header__cart-wrapper">
        <div className="product__cart">
          <div className="product__cart-detail">
            <h4 className="product__cart-title">
              <a href="/">Butler Stool Ladder</a>
            </h4>
            <span className="product__cart-info">
              <span className="product__cart-qty">1 </span>x $60
            </span>
          </div>

          <figure className="product__cart-media">
            <a href="/" className="product__cart-image">
              <img src="images/cart.jpg" alt="product" />
            </a>
          </figure>

          <button className="btn-remove" title="Remove Product">
            <i className="las la-times"></i>
          </button>
        </div>
        <div className="header__cart-total">
          <span>Total</span>
          <span className="header__cart-total-price">$100</span>
        </div>
        <div className="header__cart-action">
          <a href="/" className="btn btn-primary">
            View Cart
          </a>
          <a href="/" className="btn btn-outline-primary">
            <span>Checkout </span>
            <i className="las la-arrow-right"></i>
          </a>
        </div>
      </div>
    </div>
  );
}

export default CartMenu;
