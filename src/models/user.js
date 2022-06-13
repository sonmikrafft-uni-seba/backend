"use strict";

import mongoose from mongoose;
const { Schema, model } = mongoose;


// Define the User schema
const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    subscriptionPlan: ['FREE', 'PREMIUM'],
    password: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    userBanks: [UserBank],
    categoryGroups: [CategoryGroup]
});

const UserBank = new Schema({
    requisitionId: String,
    institutionId: String,
    name: String,
    metaData: Object,
    bankaccounts: [BankAccount]
});

const BankAccount = new Schema({
    name: String,
    metaData: Object,
    accesstoken: String
});

const CategoryGroup = new Schema({
    name: {
        type: String,
        required: true
    },
    budgetType: ['NONE', 'MONTHLY', 'YEARLY'],
    budgetLimit: Number,
    categories: [Category]
});

const Category = new Schema({
    name: {
        type: String,
        required: true
    },
    conditionalFilter: String,
    budgetType: ['NONE', 'MONTHLY', 'YEARLY'],
    budgetLimit: Number,
});

UserSchema.set('versionKey', false);


// Export the User model
module.exports = model('User', UserSchema);