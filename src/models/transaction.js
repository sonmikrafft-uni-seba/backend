"use strict";

import mongoose from mongoose;
const { Schema } = mongoose;


// Define the transaction schema
const TransactionSchema  = new Schema({
    bookingDate: Date, 
    valueDate: Date,
    transactionAmount: {
        type: Number,
        required: true
    },
    transactionCurrency: String,
    transactionPartnerName: String,
    remittanceInformation: String,
    transactionType: ['MANUAL', 'INCOMING', 'OUTGOING'],
    verified: Boolean,
    transactionViewed: Boolean,
    userId: Schema.Types.ObjectId,
    bankAccountId: Schema.Types.ObjectId,
    categoryId: {
        type: Schema.Types.ObjectId,
        required: true
    },
});

TransactionSchema.set('versionKey', false);


// Export the Transaction model
module.exports = mongoose.model('Transaction', TransactionSchema);