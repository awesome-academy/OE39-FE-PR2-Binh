import {
  CLOSE_ORDER,
  CLOSE_QUICKVIEW,
  CLOSE_SIGNIN,
  SHOW_ORDER,
  SHOW_QUICKVIEW,
  SHOW_SIGNIN,
} from '../constants/modalConstants';

export const showQuickViewModal = (slug) => (dispatch) => {
  dispatch({ type: SHOW_QUICKVIEW, payload: slug });
};

export const closeQuickViewModal = () => (dispatch) => {
  dispatch({ type: CLOSE_QUICKVIEW });
};

export const showSignInModal = () => (dispatch) => {
  dispatch({ type: SHOW_SIGNIN });
};

export const closeSignInModal = () => (dispatch) => {
  dispatch({ type: CLOSE_SIGNIN });
};

export const showOrderModal = (orderId) => (dispatch) => {
  dispatch({ type: SHOW_ORDER, payload: orderId });
};

export const closeOrderModal = () => (dispatch) => {
  dispatch({ type: CLOSE_ORDER });
};
