'use strict';

import mongoose from 'mongoose';
const { Schema, ObjectId, model } = mongoose;
import { TransactionType } from './constants.js';
import { TransactionCurrency } from './constants.js';

// Define the transaction schema
const TransactionSchema = new Schema({
  bookingDate: Date,
  valueDate: Date,
  transactionAmount: {
    type: Number,
    required: true,
  },
  transactionCurrency: Object.values(TransactionCurrency),
  transactionPartnerName: String,
  remittanceInformation: String,
  transactionType: Object.values(TransactionType),
  verified: Boolean,
  transactionViewed: Boolean,
  userID: {
    type: ObjectId,
    required: true,
  },
  bankAccountID: ObjectId,
  categoryID: {
    type: ObjectId,
    required: true,
  },
});

TransactionSchema.set('versionKey', false);

// Export the Transaction model
export default model('Transaction', TransactionSchema);
