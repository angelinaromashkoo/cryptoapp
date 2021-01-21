import {
  GET_COINS_LIST_FAIL,
  GET_COINS_LIST_SUCCESS,
  GET_COINS_LIST,
  GET_COIN_DETAILS,
  GET_COIN_DETAILS_SUCCESS,
  GET_COIN_DETAILS_FAIL,
  GET_CURRENCIES,
  GET_CURRENCIES_SUCCESS,
  GET_CURRENCIES_FAIL,
  GET_UPDATE_FAIL,
  GET_UPDATE_SUCCESS,
  GET_UPDATE,
} from '../types/types';
import {initialState} from './initialValues';

export default function reducer(state = initialState, action) {
  switch (action.type) {
    // COINS LIST
    case GET_COINS_LIST:
      return {...state, loading: true};
    case GET_COINS_LIST_SUCCESS:
      return {...state, loading: false, coinsList: [...action.payload.data]};
    case GET_COINS_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error while fetching coins',
      };

    // COIN DETAILS
    case GET_COIN_DETAILS:
      return {...state, loadingDetails: true};
    case GET_COIN_DETAILS_SUCCESS:
      return {
        ...state,
        loadingDetails: false,
        coinDetails: action.payload.data,
      };
    case GET_COIN_DETAILS_FAIL:
      return {
        ...state,
        loadingDetails: false,
        errorInfo: 'Error getting coin info',
      };

    //CURRENCIES
    case GET_CURRENCIES:
      return {...state, loadingCurrencies: true};
    case GET_CURRENCIES_SUCCESS:
      return {
        ...state,
        loadingCurrencies: false,
        currenciesList: action.payload.data,
      };
    case GET_CURRENCIES_FAIL:
      return {
        ...state,
        loadingCurrencies: false,
        errorInfo: 'Error getting currencies',
      };

    //UPDATE
    case GET_UPDATE:
      return {...state, loadingUpdate: true};
    case GET_UPDATE_SUCCESS:
      return {
        ...state,
        loadingUpdate: false,
        updatedCoinsList: [...action.payload.data],
      };
    case GET_UPDATE_FAIL:
      return {
        ...state,
        loadingUpdate: false,
        errorInfo: 'Error getting update',
      };

    default:
      return state;
  }
}
