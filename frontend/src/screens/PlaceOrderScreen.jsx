import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrder } from '../redux/actions/orderActions';
import Breadcrumb from '../components/Features/Breadcrumb';
import CheckoutSteps from '../components/Features/CheckoutSteps';
import PageHeader from '../components/Features/PageHeader';
import { ORDER_CREATE_RESET } from '../redux/constants/orderConstants';
import LoadingBox from '../components/Features/LoadingBox';
import MessageBox from '../components/Features/MessageBox';

function PlaceOrderScreen(props) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;

  const toPrice = (num) => Number(num.toFixed(2));
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * (c.salePrice ? c.salePrice : c.price), 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
  cart.taxPrice = toPrice(0.1 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  function placeOrderHandler(e) {
    e.preventDefault();

    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
  }

  useEffect(() => {
    if (success) {
      props.history.push(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, order, props.history, success]);

  const breadcrumb = [
    { title: 'Home', href: '/' },
    { title: 'User', href: '/user/profile' },
    { title: 'Place order', href: '/user/placeorder' },
  ];
  return (
    <div className="main">
      <PageHeader title={'Place Order'} />
      <div className="container">
        <Breadcrumb breadcrumb={breadcrumb} />
        <div className="order">
          <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
          {error && <MessageBox variant="danger">{error}</MessageBox>}
          <div className="row">
            <div className="col-lg-8">
              <div className="order__shipping">
                <h2>Shipping</h2>
                <p>
                  <strong>Name:</strong> {cart.shippingAddress.fullName} <br />
                  <strong>Address: </strong> {cart.shippingAddress.address},{' '}
                  {cart.shippingAddress.city}, {cart.shippingAddress.postalCode},{' '}
                  {cart.shippingAddress.country}
                </p>
              </div>
              <div className="order__payment">
                <h2>Payment</h2>
                <p>
                  <strong>Method:</strong> {cart.paymentMethod}
                </p>
              </div>

              <div className="order__items">
                <h2>Order Items</h2>
                <ul className="order__list">
                  {cart.cartItems.map((item, index) => (
                    <li key={index} className="order__item">
                      <div>
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          className="order__item-image"
                        ></img>
                      </div>

                      <div className="order__item-name">
                        <Link to={`/product/${item.slug}`}>{item.name}</Link>
                      </div>

                      <div className="order__item-price">
                        {item.qty} x ${item.salePrice ? item.salePrice : item.price} = $
                        {item.qty * (item.salePrice ? item.salePrice : item.price)}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="order__summary">
                <h2>Order Summary</h2>
                <div className="order__summary-subtotal">
                  <span>Items</span>
                  <span>${cart.itemsPrice.toFixed(2)}</span>
                </div>
                <div className="order__summary-shipping">
                  <span>Shipping</span>
                  <span>${cart.shippingPrice.toFixed(2)}</span>
                </div>
                <div className="order__summary-tax">
                  <span>Tax</span>
                  <span>${cart.taxPrice.toFixed(2)}</span>
                </div>
                <div className="order__summary-total">
                  <span>
                    <strong> Order Total</strong>
                  </span>
                  <span className="order__total">${cart.totalPrice.toFixed(2)}</span>
                </div>
                <div className="order__action mt-1">
                  <button
                    type="button"
                    className="btn btn btn-outline-primary"
                    disabled={cart.cartItems.length === 0}
                    onClick={placeOrderHandler}
                  >
                    Place Order
                    {loading && <LoadingBox />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrderScreen;
