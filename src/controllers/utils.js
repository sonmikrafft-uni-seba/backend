'use strict';

import mongoose from 'mongoose';

export const getDefaultCategoryGroup = () => {
  const name = 'No Group';
  return { name: name, categories: [getDefaultCategory()] };
};

export const getDefaultCategory = () => {
  return { name: 'Uncategorized' };
};

export const getDefaultBankAccount = () => {
  return { name: 'Cash' };
};
