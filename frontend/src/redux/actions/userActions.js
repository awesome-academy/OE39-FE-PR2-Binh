import Axios from 'axios';
import { toast } from 'react-toastify';
import catchErrors from '../../utils/catchErrors';
import { userApiPath } from '../../utils/router';
import {
  USER_CHANGE_PASSWORD_FAIL,
  USER_CHANGE_PASSWORD_REQUEST,
  USER_CHANGE_PASSWORD_SUCCESS,
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_FORGOT_PASSWORD_FAIL,
  USER_FORGOT_PASSWORD_REQUEST,
  USER_FORGOT_PASSWORD_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
  USER_SIGNUP_FAIL,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
} from '../constants/userConstants';

export const signin = (user) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: user });
  try {
    const { data } = await Axios.post(userApiPath('signin'), user);
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
    toast.success('Signin success');
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload: catchErrors(error),
    });
    toast.error('Signin fail');
  }
};

export const signout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: USER_SIGNOUT });
};

export const signup = (user) => async (dispatch) => {
  dispatch({ type: USER_SIGNUP_REQUEST, payload: user });
  try {
    const { data } = await Axios.post(userApiPath('signup'), user);
    dispatch({ type: USER_SIGNUP_SUCCESS, payload: data });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
    toast.success('Signup success');
  } catch (error) {
    dispatch({
      type: USER_SIGNUP_FAIL,
      payload: catchErrors(error),
    });
    toast.error('Signup fail');
  }
};

export const detailsUser = (userId) => async (dispatch, getState) => {
  dispatch({ type: USER_DETAILS_REQUEST, payload: userId });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.get(userApiPath(userId), {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_DETAILS_FAIL, payload: catchErrors(error) });
  }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
  dispatch({ type: USER_UPDATE_PROFILE_REQUEST, payload: user });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.put(userApiPath('profile'), user, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    toast.success('Updated profile success');
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_UPDATE_PROFILE_FAIL, payload: catchErrors(error) });
    toast.error('Updated profile fail');
  }
};

export const listUsers =
  ({ pageSize = 10, page = 1 }) =>
  async (dispatch, getState) => {
    dispatch({ type: USER_LIST_REQUEST });
    try {
      const {
        userSignin: { userInfo },
      } = getState();
      const { data } = await Axios.get(userApiPath(`?pageSize=${pageSize}&pageNumber=${page}`), {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      dispatch({ type: USER_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: USER_LIST_FAIL, payload: catchErrors(error) });
    }
  };

export const deleteUser = (userId) => async (dispatch, getState) => {
  dispatch({ type: USER_DELETE_REQUEST, payload: userId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.delete(userApiPath(userId), {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: USER_DELETE_SUCCESS, payload: data });
    toast.success('User deleted success');
  } catch (error) {
    dispatch({ type: USER_DELETE_FAIL, payload: catchErrors(error) });
    toast.error('User deleted fail');
  }
};

export const updateUser = (user) => async (dispatch, getState) => {
  dispatch({ type: USER_UPDATE_REQUEST, payload: user });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(userApiPath(user._id), user, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
    toast.success('User updated success');
  } catch (error) {
    dispatch({ type: USER_UPDATE_FAIL, payload: catchErrors(error) });
    toast.error('User updated fail');
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  dispatch({ type: USER_FORGOT_PASSWORD_REQUEST, payload: email });
  try {
    const { data } = await Axios.post(
      userApiPath('forgot'),
      { email },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    dispatch({ type: USER_FORGOT_PASSWORD_SUCCESS, payload: data });
    toast.success('Forgot password requested success');
  } catch (error) {
    dispatch({ type: USER_FORGOT_PASSWORD_FAIL, payload: catchErrors(error) });
    toast.error('Forgot password requested fail');
  }
};

export const resetPassword = (info) => async (dispatch) => {
  dispatch({ type: USER_CHANGE_PASSWORD_REQUEST });
  try {
    const { data } = await Axios.post(userApiPath('reset'), info, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    dispatch({ type: USER_CHANGE_PASSWORD_SUCCESS, payload: data });
    toast.success('Password reseted success');
  } catch (error) {
    dispatch({ type: USER_CHANGE_PASSWORD_FAIL, payload: catchErrors(error) });
    toast.error('Password reseted fail');
  }
};
