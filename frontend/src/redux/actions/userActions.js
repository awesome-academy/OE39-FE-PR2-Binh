import Axios from 'axios';
import { toast } from 'react-toastify';
import catchErrors from '../../utils/catchErrors';
import { userApiPath } from '../../utils/router';
import {
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
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
