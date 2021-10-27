import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Breadcrumb from '../components/Features/Breadcrumb';
import CheckoutSteps from '../components/Features/CheckoutSteps';
import PageHeader from '../components/Features/PageHeader';
import { saveShippingAddress } from '../redux/actions/cartActions';
import handleError from '../utils/handleError';

function ShippingAddressScreen(props) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const initAddressData = {
    fullName: {
      value: shippingAddress.fullName || '',
      error: '',
    },
    address: {
      value: shippingAddress.address || '',
      error: '',
    },
    city: {
      value: shippingAddress.city || '',
      error: '',
    },
    postalCode: {
      value: shippingAddress.postalCode || '',
      error: '',
    },
    country: {
      value: shippingAddress.country || '',
      error: '',
    },
  };

  const [addressData, setAddressData] = useState(initAddressData);

  const isValidate = useMemo(() => {
    for (let key in addressData) {
      const error = addressData[key].error;
      if (error !== '') return false;
    }

    return true;
  }, [addressData]);

  function changeValueHandler(e) {
    const { name, value } = e.target;
    const error = handleError(name, value);

    setAddressData({
      ...addressData,
      [name]: {
        value,
        error,
      },
    });
  }

  function shippingAdressHandler(e) {
    e.preventDefault();

    if (!isValidate) {
      toast.info('Invalid input information');
      return;
    }

    const shippingAddress = {
      fullName: addressData.fullName.value,
      address: addressData.address.value,
      city: addressData.city.value,
      postalCode: addressData.postalCode.value,
      country: addressData.country.value,
    };

    dispatch(saveShippingAddress(shippingAddress));
    props.history.push('/user/payment');
  }

  const breadcrumb = [
    { title: 'Home', href: '/' },
    { title: 'User', href: '/user/profile' },
    { title: 'Shipping', href: '/user/shipping' },
  ];
  return (
    <div className="main">
      <PageHeader title={'Shipping'} />
      <div className="container">
        <Breadcrumb breadcrumb={breadcrumb} />

        <div className="shipping">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-md-10 ">
              <CheckoutSteps step1 step2></CheckoutSteps>
              <form action="" className="shipping__form" onSubmit={shippingAdressHandler}>
                <div className="form-group">
                  <label htmlFor="fullName">Full name *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="fullName"
                    name="fullName"
                    value={addressData.fullName.value}
                    onChange={changeValueHandler}
                    aria-describedby="fullNameHelp"
                    placeholder="Enter full name"
                  />

                  {addressData.fullName.error && (
                    <small className="form-text text-danger">{addressData.fullName.error}</small>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="address">Address *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    name="address"
                    value={addressData.address.value}
                    onChange={changeValueHandler}
                    aria-describedby="addressHelp"
                    placeholder="Enter address"
                  />

                  {addressData.address.error && (
                    <small className="form-text text-danger">{addressData.address.error}</small>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="city">City *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="city"
                    name="city"
                    value={addressData.city.value}
                    onChange={changeValueHandler}
                    aria-describedby="cityHelp"
                    placeholder="Enter city"
                  />

                  {addressData.city.error && (
                    <small className="form-text text-danger">{addressData.city.error}</small>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="postalCode">Postal Code *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="postalCode"
                    name="postalCode"
                    value={addressData.postalCode.value}
                    onChange={changeValueHandler}
                    aria-describedby="postalCodeHelp"
                    placeholder="Enter postal code"
                  />

                  {addressData.postalCode.error && (
                    <small className="form-text text-danger">{addressData.postalCode.error}</small>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="email">Country *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="country"
                    name="country"
                    value={addressData.country.value}
                    onChange={changeValueHandler}
                    aria-describedby="countryHelp"
                    placeholder="Enter country"
                  />

                  {addressData.country.error && (
                    <small className="form-text text-danger">{addressData.country.error}</small>
                  )}
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

export default ShippingAddressScreen;
