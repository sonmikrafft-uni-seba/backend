'use strict';

import mongoose from 'mongoose';
import { frontendBaseUrl } from '../config.js';

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
      logo: frontendBaseUrl + '/images/budgetly_dark.png',
    },
    bankaccounts: [
      {
        name: 'Cash',
        metaData: {
          iban: '-',
          product: 'Default Account',
          owner: firstName + ' ' + lastName,
          currency: 'EUR',
        },
      },
    ],
  };
};
