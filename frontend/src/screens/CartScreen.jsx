import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Features/Breadcrumb';
import PageHeader from '../components/Features/PageHeader';
import Qty from '../components/Features/Qty';
import { addToCart, removeFromCart } from '../redux/actions/cartActions';
import { showSignInModal } from '../redux/actions/modalActions';
import { renderBaseUrl } from '../utils/router';

function CartScreen(props) {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.userSignin);

  const countItems = cartItems.reduce((acc, cur) => {
    return acc + cur.qty;
  }, 0);

  const cartTotal = cartItems.reduce((acc, cur) => {
    return acc + cur.qty * (cur.salePrice ? cur.salePrice : cur.price);
  }, 0);

  function removeCartHandler(slug) {
    dispatch(removeFromCart(slug));
  }

  function changeQtyHandler(qty, product) {
    dispatch(addToCart(product, qty));
  }

  function checkoutHandler(e) {
    e.preventDefault();

    if (userInfo) {
      props.history.push('/user/shipping');
    } else {
      dispatch(showSignInModal());
    }
  }

  const breadcrumb = [
    { title: 'Home', href: '/' },
    { title: 'Cart', href: '/cart' },
  ];

  return (
    <div className="main">
      <PageHeader title={'Shopping Cart'} />
      <div className="container">
        <Breadcrumb breadcrumb={breadcrumb} />

        <div className="cart">
          <div className="row">
            {cartItems.length === 0 ? (
              <div className="cart__empty text-center">
                <i className="cart__empty-icon las la-shopping-cart"></i>
                <p className="cart__empty-message">No products added to the cart</p>
                <Link to="/" className="cart__empty-action btn btn-primary">
                  RETURN TO SHOP
                </Link>
              </div>
            ) : (
              <>
                <div className="col-lg-9">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Product</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((cart, index) => (
                        <tr key={index}>
                          <td className="product-col">
                            <div className="product__carts">
                              <figure>
                                <Link to={`product/${cart.slug}`}>
                                  <LazyLoadImage
                                    alt={'Products'}
                                    src={renderBaseUrl(cart.images[0].url)}
                                    threshold={500}
                                    effect="black and white"
                                  />
                                </Link>
                              </figure>
                              <h3 className="product__title">
                                <Link to={`/product/${cart.slug}`}>{cart.name}</Link>
                              </h3>
                            </div>
                          </td>
                          <td className="price-col">
                            ${cart.salePrice ? cart.salePrice : cart.price}
                          </td>
                          <td className="quantity-col">
                            <Qty
                              changeQty={changeQtyHandler}
                              max={cart.countInStock}
                              value={cart.qty}
                              product={cart.slug}
                            />
                          </td>
                          <td className="total-col">
                            ${cart.qty * (cart.salePrice ? cart.salePrice : cart.price)}
                          </td>
                          <td className="remove-col">
                            <button
                              className="btn-remove"
                              onClick={() => removeCartHandler(cart.slug)}
                            >
                              <i className="las la-times"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="col-lg-3">
                  <div className="cart__summary">
                    <h3>Cart Total</h3>
                    <div className="cart__total">
                      <span>Subtotal: ({countItems} items)</span>
                      <span>${cartTotal}</span>
                    </div>
                    <div className="cart__action mt-2">
                      <Link to="/" className="btn btn-outline-primary" onClick={checkoutHandler}>
                        PROCEED TO CHECKOUT
                      </Link>

                      <Link to="/" className="btn btn-outline-darker mt-1">
                        CONTINUE SHOPPING
                        <span>
                          <i className="las la-sync"></i>
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartScreen;
