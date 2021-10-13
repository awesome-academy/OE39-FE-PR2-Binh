import React from 'react';
import { Switch } from 'react-router';
import Layout from '../App';
import NotFoundScreen from '../screens/NotFoundScreen';
import PaymentMethodScreen from '../screens/PaymentMethodScreen';
import PlaceOrderScreen from '../screens/PlaceOrderScreen';
import ShippingAddressScreen from '../screens/ShippingAddressScreen';
import PrivateRoute from './PrivateRoute';

function UserRouter(props) {
  return (
    <Layout>
      <Switch>
        <PrivateRoute exact path="/user/placeorder" component={PlaceOrderScreen} />
        <PrivateRoute exact path="/user/payment" component={PaymentMethodScreen} />
        <PrivateRoute exact path="/user/shipping" component={ShippingAddressScreen} />
        <PrivateRoute path="*" component={NotFoundScreen} />
      </Switch>
    </Layout>
  );
}

export default UserRouter;
