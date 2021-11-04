import Axios from 'axios';
import { toast } from 'react-toastify';
import catchErrors from '../../utils/catchErrors';
import { categoryApiPath } from '../../utils/router';
import {
  CATEGORY_CREATE_FAIL,
  CATEGORY_CREATE_REQUEST,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_DELETE_FAIL,
  CATEGORY_DELETE_REQUEST,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_DETAILS_FAIL,
  CATEGORY_DETAILS_REQUEST,
  CATEGORY_DETAILS_SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_UPDATE_FAIL,
  CATEGORY_UPDATE_REQUEST,
  CATEGORY_UPDATE_SUCCESS,
} from '../constants/categoryConstants';

export const listCategories = () => async (dispatch) => {
  dispatch({ type: CATEGORY_LIST_REQUEST });
  try {
    const { data } = await Axios.get(categoryApiPath());
    dispatch({ type: CATEGORY_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CATEGORY_LIST_FAIL, payload: catchErrors(error) });
  }
};

export const createCategory = (category) => async (dispatch, getState) => {
  dispatch({ type: CATEGORY_CREATE_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.post(categoryApiPath(), category, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({
      type: CATEGORY_CREATE_SUCCESS,
      payload: data.message,
    });
    toast.success('Category created success');
  } catch (error) {
    dispatch({ type: CATEGORY_CREATE_FAIL, payload: catchErrors(error) });
    toast.error('Category created fail');
  }
};

export const detailsCategory = (slug) => async (dispatch) => {
  dispatch({ type: CATEGORY_DETAILS_REQUEST, payload: slug });
  try {
    const { data } = await Axios.get(categoryApiPath(slug));
    dispatch({ type: CATEGORY_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CATEGORY_DETAILS_FAIL, payload: catchErrors(error) });
  }
};

export const updateCategory = (category, slug) => async (dispatch, getState) => {
  dispatch({ type: CATEGORY_UPDATE_REQUEST, payload: category });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(categoryApiPath(slug), category, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: CATEGORY_UPDATE_SUCCESS, payload: data });
    toast.success('Category updated success');
  } catch (error) {
    dispatch({ type: CATEGORY_UPDATE_FAIL, payload: catchErrors(error) });
    toast.error('Category updated fail');
  }
};

export const deleteCategory = (slug) => async (dispatch, getState) => {
  dispatch({ type: CATEGORY_DELETE_REQUEST, payload: slug });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.delete(categoryApiPath(slug), {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: CATEGORY_DELETE_SUCCESS, payload: data });
    toast.success('Category deleted success');
  } catch (error) {
    dispatch({ type: CATEGORY_DELETE_FAIL, payload: catchErrors(error) });
    toast.error('Category deleted fail');
  }
};
