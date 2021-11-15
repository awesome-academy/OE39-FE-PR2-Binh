import {
  FILTER_BY_BRAND,
  FILTER_BY_CATEGORY,
  FILTER_BY_NAME,
  FILTER_BY_ORDER,
  FILTER_BY_PAGE,
  FILTER_BY_PRICE,
  FILTER_BY_RATING,
  FILTER_RESET,
} from '../constants/filterContants';

const initFilterState = {
  page: 1,
  filterCategory: [],
  filterBrand: [],
  filterRating: 0,
  filterPrice: [0, 0],
  filterName: '',
  orderBy: 'newest',
};

export const filtersReducer = (state = initFilterState, action) => {
  switch (action.type) {
    case FILTER_BY_CATEGORY:
      return {
        ...state,
        filterCategory: action.payload,
      };
    case FILTER_BY_BRAND:
      return {
        ...state,
        filterBrand: action.payload,
      };
    case FILTER_BY_RATING:
      return {
        ...state,
        filterRating: action.payload,
      };
    case FILTER_BY_PRICE:
      return {
        ...state,
        filterPrice: action.payload,
      };
    case FILTER_BY_NAME:
      return {
        ...state,
        filterName: action.payload,
      };
    case FILTER_BY_ORDER:
      return {
        ...state,
        orderBy: action.payload,
      };
    case FILTER_BY_PAGE:
      return {
        ...state,
        page: action.payload,
      };
    case FILTER_RESET:
      return initFilterState;
    default:
      return state;
  }
};
