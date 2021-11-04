import Axios from 'axios';
import { toast } from 'react-toastify';
import catchErrors from '../../utils/catchErrors';
import { categoryApiPath } from '../../utils/router';
import {
  CATEGORY_CREATE_FAIL,
  CATEGORY_CREATE_REQUEST,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_DETAILS_FAIL,
  CATEGORY_DETAILS_REQUEST,
  CATEGORY_DETAILS_SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
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
