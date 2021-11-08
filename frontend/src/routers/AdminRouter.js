import React from 'react';
import { Switch } from 'react-router-dom';
import AdminDashboardScreen from '../screens/AdminDashboardScreen';
import LayoutDashboard from '../screens/DashboardScreen';
import ManageCategoriesScreen from '../screens/ManageCategoriesScreen';
import ProductAddEditScreen from '../screens/ProductAddEditScreen';
import ProductListScreen from '../screens/ProductListScreen';
import AdminRoute from './AdminRoute';

function AdminRouter(props) {
  return (
    <LayoutDashboard>
      <Switch>
        <AdminRoute exact path="/admin/products/edit/:slug" component={ProductAddEditScreen} />
        <AdminRoute exact path="/admin/products/add" component={ProductAddEditScreen} />
        <AdminRoute exact path="/admin/products" component={ProductListScreen} />
        <AdminRoute exact path="/admin/categories" component={ManageCategoriesScreen} />
        <AdminRoute exact path="/admin" component={AdminDashboardScreen} />
      </Switch>
    </LayoutDashboard>
  );
}

export default AdminRouter;
