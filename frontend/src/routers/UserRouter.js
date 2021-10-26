import React from 'react';
import { Switch } from 'react-router';
import Layout from '../App';
import NotFoundScreen from '../screens/NotFoundScreen';
import ShippingAddressScreen from '../screens/ShippingAddressScreen';
import PrivateRoute from './PrivateRoute';

function UserRouter(props) {
  return (
    <Layout>
      <Switch>
        <PrivateRoute exact path="/user/shipping" component={ShippingAddressScreen} />
        <PrivateRoute path="*" component={NotFoundScreen} />
      </Switch>
    </Layout>
  );
}

export default UserRouter;
