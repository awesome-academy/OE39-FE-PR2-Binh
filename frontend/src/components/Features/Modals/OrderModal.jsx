import React, { useEffect } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { closeOrderModal } from '../../../redux/actions/modalActions';
import { deliverOrder, detailsOrder, paymentOrder } from '../../../redux/actions/orderActions';
import { ORDER_DELIVER_RESET, ORDER_PAY_RESET } from '../../../redux/constants/orderConstants';
import LoadingBox from '../LoadingBox';
import MessageBox from '../MessageBox';
import OrderDetailSkeleton from '../Skeleton/OrderDetailSkeleton';

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(51,51,51,0.6)',
    zIndex: '1000',
  },
};

function OrderModal(props) {
  const dispatch = useDispatch();
  const { type, showModal, order: orderId } = useSelector((state) => state.modal);

  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, error, order } = orderDetails;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, error: errorPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, error: errorDeliver, success: successDeliver } = orderDeliver;

  useEffect(() => {
    if (!order || successPay || successDeliver || (order && order._id !== orderId)) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(detailsOrder(orderId));
    }
  }, [dispatch, order, orderId, successPay, successDeliver]);

  const paymentHandler = () => {
    dispatch(paymentOrder(orderId, null));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(orderId));
  };

  function closeModal() {
    dispatch(closeOrderModal());
  }

  return (
    <>
      {type === 'order' && showModal && (
        <Modal
          isOpen={showModal}
          ariaHideApp={false}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Quickview Modal"
          className="modal"
          id="modal__quickview"
        >
          <div className="modal__content">
            <button type="button" className="modal__close" onClick={closeModal}>
              <i className="las la-times"></i>
            </button>

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
                            {errorDeliver && (
                              <MessageBox variant="danger">{errorDeliver}</MessageBox>
                            )}
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
        </Modal>
      )}
    </>
  );
}

export default OrderModal;
