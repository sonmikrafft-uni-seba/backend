'use strict';

import {
  defaultAccountName,
  defaultCategoryGroup,
  defaultCategoryName,
} from '../../../frontend/src/constants.js';
import { frontendBaseUrl } from '../config.js';
import { TransactionCurrency } from '../models/constants.js';

export const getDefaultCategoryGroup = () => {
  const name = defaultCategoryGroup;
  return { name: name, categories: [getDefaultCategory()] };
};

export const getDefaultCategory = () => {
  return { name: defaultCategoryName };
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
        name: defaultAccountName,
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
