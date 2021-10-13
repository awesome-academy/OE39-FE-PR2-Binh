import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Breadcrumb from '../components/Features/Breadcrumb';
import CheckoutSteps from '../components/Features/CheckoutSteps';
import PageHeader from '../components/Features/PageHeader';
import { savePaymentMethod } from '../redux/actions/cartActions';

function PaymentMethodScreen(props) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { paymentMethod: payment } = cart;

  const [paymentMethod, setPaymentMethod] = useState(payment);

  function paymentMethodHandler(e) {
    e.preventDefault();

    dispatch(savePaymentMethod(paymentMethod));
    props.history.push('/user/placeorder');
  }

  const breadcrumb = [
    { title: 'Home', href: '/' },
    { title: 'User', href: '/user/profile' },
    { title: 'Payment', href: '/user/payment' },
  ];
  return (
    <div className="main">
      <PageHeader title={'Payment Method'} />
      <div className="container">
        <Breadcrumb breadcrumb={breadcrumb} />
        <div className="payment">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-md-10 ">
              <CheckoutSteps step1 step2 step3></CheckoutSteps>
              <form action="" className="payment__form" onSubmit={paymentMethodHandler}>
                <div className="custom-control custom-radio mb-1">
                  <input
                    type="radio"
                    id="paypal"
                    value="PayPal"
                    name="paymentMethod"
                    checked={paymentMethod === 'PayPal'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="custom-control-input"
                  />
                  <label className="custom-control-label" htmlFor="paypal">
                    PayPal
                  </label>
                </div>
                <div className="custom-control custom-radio mb-2">
                  <input
                    type="radio"
                    id="stripe"
                    value="Stripe"
                    name="paymentMethod"
                    checked={paymentMethod === 'Stripe'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="custom-control-input"
                  />
                  <label className="custom-control-label" htmlFor="stripe">
                    Stripe
                  </label>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <button type="submit" className="btn btn-primary">
                    Continue
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentMethodScreen;
