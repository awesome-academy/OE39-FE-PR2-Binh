import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from '../../../redux/actions/cartActions';

function CartMenu(props) {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const countItems = cartItems.reduce((acc, cur) => {
    return acc + cur.qty;
  }, 0);

  const cartTotal = cartItems.reduce((acc, cur) => {
    return acc + cur.qty * (cur.salePrice ? cur.salePrice : cur.price);
  }, 0);

  function removeCartHandler(slug) {
    dispatch(removeFromCart(slug));
  }

  return (
    <div className="header__cart">
      <Link to="/cart" className="header__cart-icon">
        <i className="las la-shopping-cart"></i>
        <span className="header__cart-count">{countItems || 0}</span>
      </Link>
      <div className="header__cart-wrapper">
        {cartItems.length === 0 ? (
          <div className="text-center">No products in the cart.</div>
        ) : (
          <>
            <div className="header__cart-list">
              {cartItems.map((cart, index) => (
                <div key={index} className="product__cart">
                  <div className="product__cart-detail">
                    <h4 className="product__cart-title">
                      <Link to={`/product/${cart.slug}`}>{cart.name}</Link>
                    </h4>
                    <span className="product__cart-info">
                      <span className="product__cart-qty">{cart.qty} </span>x $
                      {cart.salePrice ? cart.salePrice : cart.price}
                    </span>
                  </div>

                  <figure className="product__cart-media">
                    <Link to={`/product/${cart.slug}`} className="product__cart-image">
                      <img src={cart.images[0]} alt="product" />
                    </Link>
                  </figure>

                  <button
                    className="btn-remove"
                    title="Remove Product"
                    onClick={() => removeCartHandler(cart.slug)}
                  >
                    <i className="las la-times"></i>
                  </button>
                </div>
              ))}
            </div>

            <div className="header__cart-total">
              <span>Total</span>
              <span className="header__cart-total-price">${cartTotal}</span>
            </div>
            <div className="header__cart-action">
              <Link to="/cart" className="btn btn-primary">
                View Cart
              </Link>
              <Link to="/" className="btn btn-outline-primary">
                <span>Checkout </span>
                <i className="las la-arrow-right"></i>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CartMenu;
