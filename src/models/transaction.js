"use strict";

import mongoose from mongoose;
const { Schema, model } = mongoose;
import { TransactionType } from './enums/transactionType.ts'
import { TransactionCurrency } from './enums/transactionCurrency.ts';


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
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    bankAccountId: Schema.Types.ObjectId,
    categoryId: {
        type: Schema.Types.ObjectId,
        required: true
    },
});

TransactionSchema.set('versionKey', false);


// Export the Transaction model
module.exports = model('Transaction', TransactionSchema);