import { LOAD_CART, ADD_PRODUCT, REMOVE_PRODUCT } from './actionTypes';
import axios from 'axios';

export const loadCart = products => ({
  type: LOAD_CART,
  payload: products
});

export const addProduct = product => ({
  type: ADD_PRODUCT,
  payload: product
});

export const removeProduct = product => ({
  type: REMOVE_PRODUCT,
  payload: product
});

export const createCheck = async check => {
  await axios.post('http://127.0.0.1:8000/sales_check/', check).then(res => {
    console.log(res);
  });
};
