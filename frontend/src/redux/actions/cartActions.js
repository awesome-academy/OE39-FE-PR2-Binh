import Axios from 'axios';
import { toast } from 'react-toastify';
import { productApiPath } from '../../utils/router';
import {
  CART_ADD_ITEM,
  CART_ADD_ITEM_FAIL,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from '../constants/cartConstants';

export const addToCart = (slug, qty) => async (dispatch, getState) => {
  const { data } = await Axios.get(productApiPath(slug));
  if (data.countInStock === 0 || data.countInStock < qty) {
    dispatch({
      type: CART_ADD_ITEM_FAIL,
      payload: 'Can not add to cart',
    });
    toast.error('Can not add to cart');
  } else {
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        name: data.name,
        slug: data.slug,
        images: data.images,
        price: data.price,
        salePrice: data.salePrice,
        countInStock: data.countInStock,
        product: data._id,
        qty,
      },
    });
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
    toast.success('Product added to Cart');
  }
};

export const removeFromCart = (slug) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: slug });
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
  toast.error('Product removed from Cart');
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data });
  localStorage.setItem('shippingAddress', JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data });
  localStorage.setItem('paymentMethod', JSON.stringify(data));
};
