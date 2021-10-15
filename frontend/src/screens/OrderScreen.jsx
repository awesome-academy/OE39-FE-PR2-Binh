import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { PayPalButton } from 'react-paypal-button-v2';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Features/Breadcrumb';
import LoadingBox from '../components/Features/LoadingBox';
import MessageBox from '../components/Features/MessageBox';
import PageHeader from '../components/Features/PageHeader';
import OrderDetailSkeleton from '../components/Features/Skeleton/OrderDetailSkeleton';
import { deliverOrder, detailsOrder, paymentOrder } from '../redux/actions/orderActions';
import { ORDER_DELIVER_RESET, ORDER_PAY_RESET } from '../redux/constants/orderConstants';

function OrderScreen(props) {
  const { orderId } = props.match.params;

  const [sdkReady, setSdkReady] = useState(false);

  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, error, order } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, error: errorPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, error: errorDeliver, success: successDeliver } = orderDeliver;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const addPayPalScript = async () => {
    const { data } = await Axios.get(`${process.env.REACT_APP_API_ENDPOINT}/config/paypal`);
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    document.body.appendChild(script);
  };

  useEffect(() => {
    if (!order || successPay || successDeliver || (order && order._id !== orderId)) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(detailsOrder(orderId));
    } else {
      if (!order.isPaid) {
        if (!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
  }, [dispatch, order, orderId, successPay, successDeliver]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(paymentOrder(orderId, paymentResult));
  };

  const paymentHandler = () => {
    dispatch(paymentOrder(orderId, null));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(orderId));
  };

  const breadcrumb = [
    { title: 'Home', href: '/' },
    { title: 'User', href: '/user/profile' },
    { title: 'Order details', href: `/user/order/${order?._id}` },
  ];

  return (
    <div className="main">
      <PageHeader title={'Order Detail'} />
      <div className="container">
        <Breadcrumb breadcrumb={breadcrumb} />
        <div className="order">
          {loading ? (
            <OrderDetailSkeleton />
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              <h2 className="mt-1 mb-2">{`Order ${order?._id}`}</h2>
              <div className="row">
                <div className="col-lg-8">
                  <div className="order__shipping">
                    <h2>Shipping</h2>
                    <p>
                      <strong>Name:</strong> {order.shippingAddress.fullName} <br />
                      <strong>Address: </strong> {order.shippingAddress.address},{' '}
                      {order.shippingAddress.city}, {order.shippingAddress.postalCode},{' '}
                      {order.shippingAddress.country}
                    </p>
                    {order.isDelivered ? (
                      <MessageBox adClass="mt-1" variant="success">
                        Delivered at {order.deliveredAt}
                      </MessageBox>
                    ) : (
                      <MessageBox adClass="mt-1" variant="danger">
                        Not Delivered
                      </MessageBox>
                    )}
                  </div>
                  <div className="order__payment">
                    <h2>Payment</h2>
                    <p>
                      <strong>Method:</strong> {order.paymentMethod}
                    </p>
                    {order.isPaid ? (
                      <MessageBox adClass="mt-1" variant="success">
                        Paid at {order.paidAt}
                      </MessageBox>
                    ) : (
                      <MessageBox adClass="mt-1" variant="danger">
                        Not Paid
                      </MessageBox>
                    )}
                  </div>

                  <div className="order__items">
                    <h2>Order Items</h2>
                    <ul className="order__list">
                      {order.orderItems.map((item, index) => (
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
                      <span>${order.itemsPrice.toFixed(2)}</span>
                    </div>
                    <div className="order__summary-shipping">
                      <span>Shipping</span>
                      <span>${order.shippingPrice.toFixed(2)}</span>
                    </div>
                    <div className="order__summary-tax">
                      <span>Tax</span>
                      <span>${order.taxPrice.toFixed(2)}</span>
                    </div>
                    <div className="order__summary-total">
                      <span>
                        <strong> Order Total</strong>
                      </span>
                      <span className="order__total">${order.totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="order__action mt-1">
                      {userInfo.isAdmin ? (
                        ''
                      ) : !order.isPaid && !sdkReady ? (
                        <LoadingBox />
                      ) : (
                        <>
                          {errorPay && <MessageBox variant="danger">{errorPay}</MessageBox>}
                          {loadingPay && <LoadingBox />}

                          <PayPalButton
                            amount={order.totalPrice}
                            onSuccess={successPaymentHandler}
                          ></PayPalButton>
                        </>
                      )}

                      {userInfo.isAdmin && !order.isPaid && (
                        <>
                          {errorPay && <MessageBox variant="danger">{errorPay}</MessageBox>}
                          <button
                            type="button"
                            className="btn btn-outline-primary"
                            onClick={paymentHandler}
                          >
                            Pay Order
                            {loadingPay && <LoadingBox />}
                          </button>
                        </>
                      )}

                      {userInfo.isAdmin && !order.isDelivered && (
                        <>
                          {errorDeliver && <MessageBox variant="danger">{errorDeliver}</MessageBox>}
                          <button
                            type="button"
                            className="btn btn-outline-primary"
                            onClick={deliverHandler}
                          >
                            Deliver Order
                            {loadingDeliver && <LoadingBox />}
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderScreen;
