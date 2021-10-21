import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import {
  productDetailsReducer,
  productListReducer,
  productListRelatedMoreReducer,
  productListRelatedReducer,
} from './reducers/productReducers';

const initialState = {};

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productListRelated: productListRelatedReducer,
  productListRelatedMore: productListRelatedMoreReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;
