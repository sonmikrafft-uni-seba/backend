'use strict';

import {
  HTTP_ERROR_TYPE_NUMBER,
  HTTP_ERROR_TYPE,
  HTTP_ERROR_RESPONSE,
} from '../messages.js';
import { TransactionCurrency, TransactionType } from '../models/constants.js';
import TransactionModel from '../models/transaction.js';
import UserModel from '../models/user.js';

/**
 * Create a new transaction in database for given user
 */
const create = async (req, res) => {
  // check if the body of the request contains all necessary properties
  if (!Object.prototype.hasOwnProperty.call(req.body, 'transactionAmount'))
    return res.status(HTTP_ERROR_TYPE_NUMBER.BAD_REQUEST).json({
      error: HTTP_ERROR_TYPE.BAD_REQUEST,
      message: HTTP_ERROR_RESPONSE.MISSING_TRANSACTION_AMOUNT,
    });

  if (!Object.prototype.hasOwnProperty.call(req.body, 'categoryID'))
    return res.status(HTTP_ERROR_TYPE_NUMBER.BAD_REQUEST).json({
      error: HTTP_ERROR_TYPE.BAD_REQUEST,
      message: HTTP_ERROR_RESPONSE.MISSING_CATEGORY_ID,
    });

  try {
    let user = await UserModel.findById(req.params.userId).exec();

    // check if user with the given id exists
    if (!user) {
      return res.status(HTTP_ERROR_TYPE_NUMBER.NOT_FOUND).json({
        error: HTTP_ERROR_TYPE.USER_NOT_FOUND,
        message: HTTP_ERROR_RESPONSE.USER_NOT_FOUND,
      });
    }

    console.log('found user');

    // create transaction object
    const transaction = {
      bookingDate: req.body.bookingDate,
      valueDate: req.body.valueDate,
      transactionAmount: req.body.transactionAmount,
      transactionCurrency: TransactionCurrency.EUR,
      transactionPartnerName: req.body.transactionPartnerName,
      remittanceInformation: req.body.remittanceInformation,
      transactionType: TransactionType.MANUAL,
      verified: true,
      transactionViewed: true,
      userID: req.params.userId,
      bankAccountID: req.body.bankAccountID,
      categoryID: req.body.categoryID,
    };

    // create transaction in database
    let newTransaction = await TransactionModel.create(transaction);

    console.log('created transaction');

    return res.status(HTTP_ERROR_TYPE_NUMBER.SUCCESS).json(newTransaction);
  } catch (err) {
    console.log(err);
    return res.status(HTTP_ERROR_TYPE_NUMBER.INTERNAL_SERVER_ERROR).json({
      error: HTTP_ERROR_TYPE.INTERNAL_SERVER_ERROR,
      message: HTTP_ERROR_RESPONSE.INTERNAL_SERVER_ERROR,
    });
  }
};

/**
 * Return a transaction with specific id from database for a specific userId
 */
const read = async (req, res) => {
  try {
    let user = await UserModel.findById(req.params.userId).exec();

    // check if user with the given id exists
    if (!user) {
      return res.status(HTTP_ERROR_TYPE_NUMBER.NOT_FOUND).json({
        error: HTTP_ERROR_TYPE.USER_NOT_FOUND,
        message: HTTP_ERROR_RESPONSE.USER_NOT_FOUND,
      });
    }

    // find transaction with transactionId for a specific userId
    let transaction = await TransactionModel.findOne({
      id: req.params.transactionId,
      userID: req.params.userId,
    }).exec();

    if (!transaction) {
      return res.status(HTTP_ERROR_TYPE_NUMBER.NOT_FOUND).json({
        error: HTTP_ERROR_TYPE.TRANSACTION_NOT_FOUND,
        message: HTTP_ERROR_RESPONSE.TRANSACTION_NOT_FOUND,
      });
    }

    return res.status(HTTP_ERROR_TYPE_NUMBER.SUCCESS).json(transaction);
  } catch (err) {
    console.log(err);
    return res.status(HTTP_ERROR_TYPE_NUMBER.INTERNAL_SERVER_ERROR).json({
      error: HTTP_ERROR_TYPE.INTERNAL_SERVER_ERROR,
      message: HTTP_ERROR_RESPONSE.INTERNAL_SERVER_ERROR,
    });
  }
};

/**
 * Update a transactions's properties in database for a specific userId
 */
const update = async (req, res) => {
  try {
    let user = await UserModel.findById(req.params.userId).exec();

    // check if user with the given id exists
    if (!user) {
      return res.status(HTTP_ERROR_TYPE_NUMBER.NOT_FOUND).json({
        error: HTTP_ERROR_TYPE.USER_NOT_FOUND,
        message: HTTP_ERROR_RESPONSE.USER_NOT_FOUND,
      });
    }

    // find transaction with transactionId for a specific userId
    let transaction = await TransactionModel.findOneAndUpdate(
      {
        id: req.params.transactionId,
        userID: req.params.userId,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    ).exec();

    if (!transaction) {
      return res.status(HTTP_ERROR_TYPE_NUMBER.NOT_FOUND).json({
        error: HTTP_ERROR_TYPE.TRANSACTION_NOT_FOUND,
        message: HTTP_ERROR_RESPONSE.TRANSACTION_NOT_FOUND,
      });
    }

    return res.status(HTTP_ERROR_TYPE_NUMBER.SUCCESS).json(transaction);
  } catch (err) {
    console.log(err);
    return res.status(HTTP_ERROR_TYPE_NUMBER.INTERNAL_SERVER_ERROR).json({
      error: HTTP_ERROR_TYPE.INTERNAL_SERVER_ERROR,
      message: HTTP_ERROR_RESPONSE.INTERNAL_SERVER_ERROR,
    });
  }
};

/**
 * Delete a transaction in database for a specific userId
 */
const remove = async (req, res) => {
  try {
    let user = await UserModel.findById(req.params.userId).exec();

    // check if user with the given id exists
    if (!user) {
      return res.status(HTTP_ERROR_TYPE_NUMBER.NOT_FOUND).json({
        error: HTTP_ERROR_TYPE.USER_NOT_FOUND,
        message: HTTP_ERROR_RESPONSE.USER_NOT_FOUND,
      });
    }

    // find transaction with transactionId for a specific userId
    await TransactionModel.findOneAndRemove({
      id: req.params.transactionId,
      userID: req.params.userId,
    }).exec();

    return res.status(HTTP_ERROR_TYPE_NUMBER.SUCCESS).json({
      message: `Transaction with id:${req.params.transactionId} was deleted`,
    });
  } catch (err) {
    console.log(err);
    return res.status(HTTP_ERROR_TYPE_NUMBER.INTERNAL_SERVER_ERROR).json({
      error: HTTP_ERROR_TYPE.INTERNAL_SERVER_ERROR,
      message: HTTP_ERROR_RESPONSE.INTERNAL_SERVER_ERROR,
    });
  }
};

/**
 * Return a list of all transactions in database for a specific userId
 */
const list = async (req, res) => {
  try {
    let user = await UserModel.findById(req.params.userId).exec();

    // check if user with the given id exists
    if (!user) {
      return res.status(HTTP_ERROR_TYPE_NUMBER.NOT_FOUND).json({
        error: HTTP_ERROR_TYPE.USER_NOT_FOUND,
        message: HTTP_ERROR_RESPONSE.USER_NOT_FOUND,
      });
    }

    // find all transactions for a specific userId
    let transactions = await TransactionModel.find({
      userID: req.params.userId,
    }).exec();

    return res.status(HTTP_ERROR_TYPE_NUMBER.SUCCESS).json(transactions);
  } catch (err) {
    console.log(err);
    return res.status(HTTP_ERROR_TYPE_NUMBER.INTERNAL_SERVER_ERROR).json({
      error: HTTP_ERROR_TYPE.INTERNAL_SERVER_ERROR,
      message: HTTP_ERROR_RESPONSE.INTERNAL_SERVER_ERROR,
    });
  }
};

export default {
  create,
  read,
  update,
  remove,
  list,
};
