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
  PRODUCT_RELATED_LOADMORE_RESET,
  PRODUCT_RELATED_LOADMORE_SUCCESS,
  PRODUCT_RELATED_REQUEST,
  PRODUCT_RELATED_SUCCESS,
} from '../constants/productConstants';

export const productListReducer = (state = { loading: true, products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true };
    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true };
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productListRelatedReducer = (state = { loading: true, products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_RELATED_REQUEST:
      return { loading: true };
    case PRODUCT_RELATED_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case PRODUCT_RELATED_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productListRelatedMoreReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_RELATED_LOADMORE_REQUEST:
      return { loading: true };
    case PRODUCT_RELATED_LOADMORE_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case PRODUCT_RELATED_LOADMORE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_RELATED_LOADMORE_RESET:
      return {};
    default:
      return state;
  }
};
