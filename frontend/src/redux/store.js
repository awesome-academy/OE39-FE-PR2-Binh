import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReducers';
import {
  categoryCreateReducer,
  categoryDeleteReducer,
  categoryDetailsReducer,
  categoryListReducer,
  categoryUpdateReducer,
} from './reducers/categoryReducers';
import { filtersReducer } from './reducers/filterReducers';
import { modalReducer } from './reducers/modalReducers';
import {
  orderCreateReducer,
  orderDeleteReducer,
  orderDeliverReducer,
  orderDetailsReducer,
  orderListReducer,
  orderMineListReducer,
  orderPayReducer,
} from './reducers/orderReducers';
import {
  productBrandListReducer,
  productCreateReducer,
  productDeleteReducer,
  productDetailsReducer,
  productListReducer,
  productListRelatedMoreReducer,
  productListRelatedReducer,
  productReviewCreateReducer,
  productSearchReducer,
  productUpdateReducer,
} from './reducers/productReducers';
import { imageUploadReducer } from './reducers/uploadReducers';
import {
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  userSigninReducer,
  userSignUpReducer,
  userUpdateProfileReducer,
  userUpdateReducer,
} from './reducers/userReducers';

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
  filters: filtersReducer,
  imageUpload: imageUploadReducer,
  cart: cartReducer,
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productListRelated: productListRelatedReducer,
  productListRelatedMore: productListRelatedMoreReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productDelete: productDeleteReducer,
  productBrandList: productBrandListReducer,
  productSearch: productSearchReducer,
  productReviewCreate: productReviewCreateReducer,
  userSignin: userSigninReducer,
  userSignup: userSignUpReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  orderMine: orderMineListReducer,
  orderList: orderListReducer,
  orderDelete: orderDeleteReducer,
  categoryList: categoryListReducer,
  categoryCreate: categoryCreateReducer,
  categoryDetails: categoryDetailsReducer,
  categoryUpdate: categoryUpdateReducer,
  categoryDelete: categoryDeleteReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;
