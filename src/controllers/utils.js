'use strict';

import { frontendBaseUrl } from '../config.js';
import { TransactionCurrency } from '../models/constants.js';

export const getDefaultCategoryGroup = () => {
  const name = 'No Group';
  return { name: name, categories: [getDefaultCategory()] };
};

export const getDefaultCategory = () => {
  return { name: 'Uncategorized' };
};

export const getDefaultBank = (firstName, lastName) => {
  return {
    institutionID: 'BUDGETLY',
    name: 'Budgetly',
    metaData: {
      logo: frontendBaseUrl + '/images/budgetly_logo.png',
    },
    bankaccounts: [
      {
        name: 'Default Account',
        metaData: {
          iban: '-',
          product: 'Cash',
          owner: firstName + ' ' + lastName,
          currency: TransactionCurrency.EUR,
        },
      },
    ],
  };
};
