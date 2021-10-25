import {
  PRODUCT_BRAND_LIST_FAIL,
  PRODUCT_BRAND_LIST_REQUEST,
  PRODUCT_BRAND_LIST_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_RESET,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_RESET,
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
  PRODUCT_RELATED_LOADMORE_RESET,
  PRODUCT_RELATED_LOADMORE_SUCCESS,
  PRODUCT_RELATED_REQUEST,
  PRODUCT_RELATED_SUCCESS,
  PRODUCT_SEARCH_FAIL,
  PRODUCT_SEARCH_REQUEST,
  PRODUCT_SEARCH_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_RESET,
  PRODUCT_UPDATE_SUCCESS,
} from '../constants/productConstants';

export const productListReducer = (state = { loading: true, products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true };
    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        paginations: {
          pageSize: action.payload.pageSize,
          current: action.payload.currentPage,
          totalPages: action.payload.totalPages,
          total: action.payload.totalRows,
        },
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

export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return { loading: true };
    case PRODUCT_CREATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case PRODUCT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const productUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return { loading: true };
    case PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true };
    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const productBrandListReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case PRODUCT_BRAND_LIST_REQUEST:
      return { loading: true };
    case PRODUCT_BRAND_LIST_SUCCESS:
      return { loading: false, brands: action.payload };
    case PRODUCT_BRAND_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productSearchReducer = (state = { loading: true, products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_SEARCH_REQUEST:
      return { loading: true };
    case PRODUCT_SEARCH_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        paginations: {
          pageSize: action.payload.pageSize,
          current: action.payload.page,
          totalPages: action.payload.pages,
          total: action.payload.totalRows,
        },
      };
    case PRODUCT_SEARCH_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
