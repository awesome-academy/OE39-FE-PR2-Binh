import Axios from 'axios';
import { toast } from 'react-toastify';
import catchErrors from '../../utils/catchErrors';
import { productApiPath } from '../../utils/router';
import {
  PRODUCT_BRAND_LIST_FAIL,
  PRODUCT_BRAND_LIST_REQUEST,
  PRODUCT_BRAND_LIST_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
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
  PRODUCT_SEARCH_FAIL,
  PRODUCT_SEARCH_REQUEST,
  PRODUCT_SEARCH_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
} from '../constants/productConstants';

export const listProducts =
  ({ category = '', pageSize = 8, page = 1 }) =>
  async (dispatch) => {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    try {
      const { data } = await Axios.get(
        `${process.env.REACT_APP_API_ENDPOINT}/products?pageSize=${pageSize}&pageNumber=${page}&category=${category}`
      );
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

export const createProduct = (product) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_CREATE_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.post(productApiPath(), product, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data });
    toast.success('Product created success');
  } catch (error) {
    dispatch({ type: PRODUCT_CREATE_FAIL, payload: catchErrors(error) });
    toast.error('Product created fail');
  }
};

export const updateProduct = (product, slug) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_UPDATE_REQUEST, payload: product });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(productApiPath(slug), product, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
    toast.success('Product updated success');
  } catch (error) {
    dispatch({ type: PRODUCT_UPDATE_FAIL, payload: catchErrors(error) });
    toast.error('Product updated fail');
  }
};

export const deleteProduct = (slug) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_DELETE_REQUEST, payload: slug });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = Axios.delete(productApiPath(slug), {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data });
    toast.success('Product deleted success');
  } catch (error) {
    dispatch({ type: PRODUCT_DELETE_FAIL, payload: catchErrors(error) });
    toast.error('Product deleted fail');
  }
};

export const listProductBrands = () => async (dispatch) => {
  dispatch({
    type: PRODUCT_BRAND_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get(productApiPath('brands'));
    dispatch({ type: PRODUCT_BRAND_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_BRAND_LIST_FAIL, payload: error.message });
  }
};

export const listProductSearch = () => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_SEARCH_REQUEST });
  try {
    let url = productApiPath('search?');

    const { filters } = getState();
    const { page, filterCategory, filterBrand, filterRating, filterPrice, filterName, orderBy } =
      filters;

    if (page) {
      url += `&pageNumber=${page}`;
    }

    if (filterName) {
      url += `&name=${filterName}`;
    }

    if (orderBy) {
      url += `&order=${orderBy}`;
    }

    if (filterCategory.length > 0) {
      filterCategory.forEach((category) => (url += `&category=${category}`));
    }

    if (filterBrand.length > 0) {
      filterBrand.forEach((brand) => (url += `&brand=${brand}`));
    }

    if (filterRating > 0) {
      url += `&rating=${filterRating}`;
    }

    if (filterPrice[0] >= 0 && filterPrice[1] >= 0) {
      url += `&min=${filterPrice[0]}&max=${filterPrice[1]}`;
    }

    const { data } = await Axios.get(url);
    dispatch({ type: PRODUCT_SEARCH_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_SEARCH_FAIL, payload: catchErrors(error) });
  }
};
