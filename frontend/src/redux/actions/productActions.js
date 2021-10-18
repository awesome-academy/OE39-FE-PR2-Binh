import Axios from 'axios';
import catchErrors from '../../utils/catchErrors';
import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from '../constants/productConstants';

export const listProducts =
  ({ category = '' }) =>
  async (dispatch) => {
    let url = `${process.env.REACT_APP_API_ENDPOINT}/products?`;

    if (category) {
      url += `category=${category}`;
    }
    dispatch({
      type: PRODUCT_LIST_REQUEST,
    });
    try {
      const { data } = await Axios.get(url);
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: PRODUCT_LIST_FAIL, payload: catchErrors(error) });
    }
  };
