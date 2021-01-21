import {
  GET_COIN_DETAILS,
  GET_COINS_LIST,
  GET_CURRENCIES,
  GET_UPDATE,
} from '../types/types';

const coinsLink = (currency, per_page = 250) =>
  `/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${per_page}&page=1&sparkline=false`;

export function getSimpleListCoins(currency) {
  return {
    type: GET_COINS_LIST,
    payload: {
      request: {
        url: coinsLink(currency),
      },
    },
  };
}

export function getUpdatedCoinsList(currency) {
  return {
    type: GET_UPDATE,
    payload: {
      request: {
        url: coinsLink(currency, 20),
      },
    },
  };
}

export function getCoinDetails(id) {
  return {
    type: GET_COIN_DETAILS,
    payload: {
      request: {
        url: `/coins/${id}`,
      },
    },
  };
}

export function getCurrencies() {
  return {
    type: GET_CURRENCIES,
    payload: {
      request: {
        url: '/simple/supported_vs_currencies',
      },
    },
  };
}
