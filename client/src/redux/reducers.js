import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import {
  SET_FORM_BRAND_NAME,
  REQUEST_BRANDS,
  RECEIVE_BRANDS,
  REQUEST_BRAND,
  RECEIVE_BRAND,
  REQUEST_PRODUCTS,
  RECEIVE_PRODUCTS,
  REQUEST_PRODUCT,
  RECEIVE_PRODUCT,
  RECEIVE_ERRORS,
  COMPLETE_UPDATE,
} from './actions';

const formBrandName = (state = '', action) => {
  switch (action.type) {
    case SET_FORM_BRAND_NAME:
      return action.payload;
    default:
      return state;
  }
};

const isFetching = (state = false, action) => {
  switch (action.type) {
    case REQUEST_BRANDS:
    case REQUEST_BRAND:
    case REQUEST_PRODUCTS:
    case REQUEST_PRODUCT:
      return true;
    case RECEIVE_BRANDS:
    case RECEIVE_BRAND:
    case RECEIVE_PRODUCTS:
    case RECEIVE_PRODUCT:
      return false;
    default:
      return state;
  }
};

const brands = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_BRANDS:
      return action.brands;
    default:
      return state;
  }
};

const brand = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_BRAND:
      return action.brand;
    default:
      return state;
  }
};

const products = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_PRODUCTS:
      return action.products;
    default:
      return state;
  }
};

const product = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_PRODUCT:
      return action.product;
    default:
      return state;
  }
};

const errors = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_ERRORS:
      return action.errors;
    default:
      return [];
  }
};

const completed = (state = false, action) => {
  switch (action.type) {
    case COMPLETE_UPDATE:
      return true;
    case REQUEST_BRANDS:
    case REQUEST_BRAND:
    case REQUEST_PRODUCTS:
    case REQUEST_PRODUCT:
    case RECEIVE_BRANDS:
    case RECEIVE_BRAND:
    case RECEIVE_PRODUCTS:
    case RECEIVE_PRODUCT:
      return false;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  isFetching,
  formBrandName,
  brand,
  brands,
  products,
  product,
  errors,
  completed,
  form: formReducer,
});

export default rootReducer;
