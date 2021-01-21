import {createStore, applyMiddleware} from 'redux';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';

import mainReducer from '../reducers/mainReducer';

const client = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3',
  responseType: 'json',
});

export const store = createStore(
  mainReducer,
  applyMiddleware(axiosMiddleware(client)),
);
