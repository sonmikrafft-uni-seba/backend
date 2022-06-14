"use strict";

import mongoose from mongoose;
const { Schema, model } = mongoose;
import { TransactionType } from './constants.js';
import { TransactionCurrency } from './constants.js';


// Define the transaction schema
const TransactionSchema  = new Schema({
    bookingDate: Date, 
    valueDate: Date,
    transactionAmount: {
        type: Number,
        required: true
    },
    transactionCurrency: TransactionCurrency,
    transactionPartnerName: String,
    remittanceInformation: String,
    transactionType: TransactionType,
    verified: Boolean,
    transactionViewed: Boolean,
    userID: {
        type: Schema.Types.ObjectId,
        required: true
    },
    bankAccountID: Schema.Types.ObjectId,
    categoryID: {
        type: Schema.Types.ObjectId,
        required: true
    },
});

TransactionSchema.set('versionKey', false);


// Export the Transaction model
module.exports = model('Transaction', TransactionSchema);