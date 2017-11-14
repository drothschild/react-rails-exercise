import axios from 'axios';
import { reset } from 'redux-form';

import {
  SET_FORM_BRAND_NAME,
  RECEIVE_BRANDS,
  RECEIVE_BRAND,
  RECEIVE_ERRORS,
  RECEIVE_PRODUCTS,
  RECEIVE_PRODUCT,
  COMPLETE_UPDATE,
} from './actions';

function receiveErrors(errors) {
  return { type: RECEIVE_ERRORS, errors: errors };
}
export function setFormBrandName(formBrandName) {
  return { type: SET_FORM_BRAND_NAME, payload: formBrandName };
}

export function requestBrands() {
  return dispatch =>
    axios.get('/api/v1/brands.json').then(res => {
      dispatch(receiveBrands(res));
    });
}

export function requestBrand(id) {
  return dispatch =>
    axios
      .get(`/api/v1/brands/${id}`)
      .then(res => {
        dispatch(receiveBrand(res));
      })
      .catch(errors => {
        dispatch(receiveErrors(errors.response.data.errors));
      });
}

function receiveBrands(res) {
  return {
    type: RECEIVE_BRANDS,
    brands: res.data,
  };
}

function receiveBrand(res) {
  return {
    type: RECEIVE_BRAND,
    brand: res.data,
  };
}

export function postBrand(name) {
  return dispatch =>
    axios
      .post('/api/v1/brands.json', { name })
      .then(res => {
        dispatch(requestBrands());
        dispatch(reset('brand'));
      })
      .catch(errors => {
        dispatch(receiveErrors(errors.response.data.errors));
      });
}

export function updateBrand({ name, id }) {
  return dispatch =>
    axios
      .put(`/api/v1/brands/${id}`, { name, id })
      .then(res => {
        dispatch(completeUpdate(res));
      })
      .catch(errors => {
        dispatch(receiveErrors(errors.response.data.errors));
      });
}

export function deleteBrand(id) {
  return dispatch =>
    axios.delete(`/api/v1/brands/${id}`).then(res => {
      dispatch(requestBrands());
    });
}

export function requestProducts() {
  return dispatch =>
    axios.get('/api/v1/products').then(res => {
      dispatch(receiveProducts(res));
    });
}

export function requestProduct(id) {
  return dispatch =>
    axios
      .get(`/api/v1/products/${id}`)
      .then(res => {
        dispatch(receiveProduct(res));
      })
      .catch(errors => {
        dispatch(receiveErrors(errors.response.data.errors));
      });
}

function receiveProducts(res) {
  return {
    type: RECEIVE_PRODUCTS,
    products: res.data,
  };
}

function receiveProduct(res) {
  return {
    type: RECEIVE_PRODUCT,
    product: res.data,
  };
}

function completeUpdate(res) {
  return { type: COMPLETE_UPDATE, product: res.data };
}

export function postProduct({ name, brand_id, description, price }) {
  return dispatch =>
    axios
      .post('/api/v1/products', {
        name,
        brand_id,
        description,
        price,
      })
      .then(res => {
        dispatch(requestProducts());
        dispatch(reset('product'));
      })
      .catch(errors => {
        dispatch(receiveErrors(errors.response.data.errors));
      });
}

export function updateProduct({ id, name, brand_id, description, price }) {
  return dispatch =>
    axios
      .put(`/api/v1/products/${id}`, { name, brand_id, description, price })
      .then(res => {
        dispatch(completeUpdate(res));
      })
      .catch(errors => {
        dispatch(receiveErrors(errors.response.data.errors));
      });
}

export function deleteProduct(id) {
  return dispatch =>
    axios.delete(`/api/v1/products/${id}`).then(res => {
      dispatch(requestProducts());
    });
}
