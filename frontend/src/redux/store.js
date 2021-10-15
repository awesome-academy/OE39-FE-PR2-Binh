import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReducers';
import { modalReducer } from './reducers/modalReducers';
import {
  orderCreateReducer,
  orderDeliverReducer,
  orderDetailsReducer,
  orderPayReducer,
} from './reducers/orderReducers';
import {
  productDetailsReducer,
  productListReducer,
  productListRelatedMoreReducer,
  productListRelatedReducer,
} from './reducers/productReducers';
import { userSigninReducer, userSignUpReducer } from './reducers/userReducers';

const initialState = {
  userSignin: {
    userInfo: localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null,
  },
  cart: {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
    shippingAddress: localStorage.getItem('shippingAddress')
      ? JSON.parse(localStorage.getItem('shippingAddress'))
      : {},
    paymentMethod: localStorage.getItem('paymentMethod')
      ? JSON.parse(localStorage.getItem('paymentMethod'))
      : 'PayPal',
  },
  modal: {
    type: '',
    showModal: false,
  },
};

const reducer = combineReducers({
  modal: modalReducer,
  cart: cartReducer,
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productListRelated: productListRelatedReducer,
  productListRelatedMore: productListRelatedMoreReducer,
  userSignin: userSigninReducer,
  userSignup: userSignUpReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;
