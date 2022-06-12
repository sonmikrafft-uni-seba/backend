"use strict";

import mongoose from mongoose
const { Schema } = mongoose;


// Define the User schema
const UserSchema  = new Schema({
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
   label: String,
   metaData: Object,
   accesstoken: String
});

const CategoryGroup = new Schema({
   title: {
    type: String,
    required: true
   },
   budgetType: ['MONTHLY', 'YEARLY'],
   budgetLimit: Number,
   categories: [Category]
});

const Category = new Schema({
    title: {
        type: String,
        required: true
    },
    conditionalFilter: String,
    budgetType: ['MONTHLY', 'YEARLY'],
    budgetLimit: Number,
});

UserSchema.set('versionKey', false);


// Export the User model
module.exports = mongoose.model('User', UserSchema);