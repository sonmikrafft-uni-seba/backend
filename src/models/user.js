'use strict';

import mongoose from 'mongoose';
const { Schema, model } = mongoose;
import { SubscriptionPlan } from './constants.js';
import { BudgetType } from './constants.js';

// Define Schema for BankAccount
const BankAccount = new Schema({
  name: String,
  metaData: Object,
  accesstoken: String,
});

// Define Schema for UserBank
const UserBank = new Schema({
  requisitionID: String,
  institutionID: String,
  name: String,
  metaData: Object,
  bankaccounts: [BankAccount],
});

// Define Schema for Category
const Category = new Schema({
  name: {
    type: String,
    required: true,
  },
  conditionalFilter: String,
  budgetType: Object.values(BudgetType),
  budgetLimit: Number,
});

// Define Schema for CategoryGroup
const CategoryGroup = new Schema({
  name: {
    type: String,
    required: true,
  },
  budgetType: Object.values(BudgetType),
  budgetLimit: Number,
  categories: [Category],
});

// Define Schema for User
const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  subscriptionPlan: Object.values(SubscriptionPlan),
  customerId: String,
  activeSubscriptionId: String,
  password: {
    type: String,
    required: true,
  },
  userBanks: [UserBank],
  categoryGroups: [CategoryGroup],
});

UserSchema.set('versionKey', false);

// Export the User model
export default model('User', UserSchema);
