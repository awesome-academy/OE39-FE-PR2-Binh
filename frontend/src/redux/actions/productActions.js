import Axios from 'axios';
import catchErrors from '../../utils/catchErrors';
import { productApiPath } from '../../utils/router';
import {
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_RELATED_FAIL,
  PRODUCT_RELATED_LOADMORE_FAIL,
  PRODUCT_RELATED_LOADMORE_REQUEST,
  PRODUCT_RELATED_LOADMORE_SUCCESS,
  PRODUCT_RELATED_REQUEST,
  PRODUCT_RELATED_SUCCESS,
} from '../constants/productConstants';

export const listProducts =
  ({ category = '' }) =>
  async (dispatch) => {
    dispatch({
      type: PRODUCT_LIST_REQUEST,
    });
    try {
      const { data } = await Axios.get(productApiPath(`?category=${category}`));
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: PRODUCT_LIST_FAIL, payload: catchErrors(error) });
    }
  };

export const detailsProduct = (slug) => async (dispatch) => {
  dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: slug });
  try {
    const { data } = await Axios.get(productApiPath(slug));
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_DETAILS_FAIL, payload: catchErrors(error) });
  }
};

export const listProductsRelated =
  (slug, page = 1) =>
  async (dispatch) => {
    dispatch({ type: PRODUCT_RELATED_REQUEST, payload: slug });
    try {
      const { data } = await Axios.get(productApiPath(`related/${slug}?pageNumber=${page}`));
      dispatch({ type: PRODUCT_RELATED_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: PRODUCT_RELATED_FAIL, payload: catchErrors(error) });
    }
  };

export const listProductsRelatedMore =
  (slug, page = 1) =>
  async (dispatch) => {
    dispatch({ type: PRODUCT_RELATED_LOADMORE_REQUEST, payload: slug });
    try {
      const { data } = await Axios.get(productApiPath(`related/${slug}?pageNumber=${page}`));
      dispatch({ type: PRODUCT_RELATED_LOADMORE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: PRODUCT_RELATED_LOADMORE_FAIL, payload: catchErrors(error) });
    }
  };
