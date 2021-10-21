import Axios from 'axios';
import { toast } from 'react-toastify';
import { productApiPath } from '../../utils/router';
import { CART_ADD_ITEM, CART_ADD_ITEM_FAIL, CART_REMOVE_ITEM } from '../constants/cartConstants';

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
        product_id: data._id,
        product: data.slug,
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
