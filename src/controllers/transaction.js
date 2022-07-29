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

  if (!Object.prototype.hasOwnProperty.call(req.body, 'transactionType'))
    return res.status(HTTP_ERROR_TYPE_NUMBER.BAD_REQUEST).json({
      error: HTTP_ERROR_TYPE.BAD_REQUEST,
      message: HTTP_ERROR_RESPONSE.MISSING_TRANSACTION_TYPE,
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

    // TODO: check that bank account exists
    // TODO: check that category exists

    // create transaction object
    let transaction = {
      transactionAmount: req.body.transactionAmount,
      transactionCurrency: TransactionCurrency.EUR,
      transactionType: req.body.transactionType,
      userID: req.params.userId,
      categoryID: req.body.categoryID,
    };

    if (Object.prototype.hasOwnProperty.call(req.body, 'bookingDate')) {
      transaction['bookingDate'] = req.body.bookingDate;
    }

    if (Object.prototype.hasOwnProperty.call(req.body, 'valueDate')) {
      transaction['valueDate'] = req.body.valueDate;
    }

    if (
      Object.prototype.hasOwnProperty.call(req.body, 'transactionPartnerName')
    ) {
      transaction['transactionPartnerName'] = req.body.transactionPartnerName;
    }

    if (
      Object.prototype.hasOwnProperty.call(req.body, 'remittanceInformation')
    ) {
      transaction['remittanceInformation'] = req.body.remittanceInformation;
    }

    if (Object.prototype.hasOwnProperty.call(req.body, 'transactionViewed')) {
      transaction['transactionViewed'] = req.body.transactionViewed;
    } else {
      // automatically set to true if manual transaction
      if (transaction.transactionType == TransactionType.MANUAL) {
        transaction['transactionViewed'] = true;
      }
    }

    if (Object.prototype.hasOwnProperty.call(req.body, 'verified')) {
      transaction['verified'] = req.body.verified;
    } else {
      // automatically set to true if manual transaction
      transaction['verified'] =
        transaction.transactionType == TransactionType.MANUAL;
    }

    if (Object.prototype.hasOwnProperty.call(req.body, 'bankAccountID')) {
      transaction['bankAccountID'] = req.body.bankAccountID;
    }

    // create transaction in database
    let newTransaction = await TransactionModel.create(transaction);

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
 * Create many new transactions in database for given user
 */
const createMany = async (req, res) => {
  try {
    let user = await UserModel.findById(req.params.userId).exec();

    // check if user with the given id exists
    if (!user) {
      return res.status(HTTP_ERROR_TYPE_NUMBER.NOT_FOUND).json({
        error: HTTP_ERROR_TYPE.USER_NOT_FOUND,
        message: HTTP_ERROR_RESPONSE.USER_NOT_FOUND,
      });
    }

    // create transactions in database
    let newTransactions = await TransactionModel.create(req.body);

    return res.status(HTTP_ERROR_TYPE_NUMBER.SUCCESS).json(newTransactions);
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
      _id: req.params.transactionId,
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
        _id: req.params.transactionId,
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
 * Update many transactions in database for a specific userId
 */
const updateMany = async (req, res) => {
  try {
    let user = await UserModel.findById(req.params.userId).exec();

    // check if user with the given id exists
    if (!user) {
      return res.status(HTTP_ERROR_TYPE_NUMBER.NOT_FOUND).json({
        error: HTTP_ERROR_TYPE.USER_NOT_FOUND,
        message: HTTP_ERROR_RESPONSE.USER_NOT_FOUND,
      });
    }

    var transactions = [];
    var newTransaction = null;

    if (!Array.isArray(transactions)) {
      throw Error;
    }

    // async in parallel
    await Promise.all(
      req.body.map(async (transaction) => {
        let transactionId = transaction._id;
        delete transaction._id;

        // find transactions for a specific userId
        newTransaction = await TransactionModel.findOneAndUpdate(
          {
            _id: transactionId,
            userID: req.params.userId,
          },
          transaction,
          {
            new: true,
            runValidators: true,
          }
        ).exec();

        if (!newTransaction) {
          return res.status(HTTP_ERROR_TYPE_NUMBER.NOT_FOUND).json({
            error: HTTP_ERROR_TYPE.TRANSACTION_NOT_FOUND,
            message: HTTP_ERROR_RESPONSE.TRANSACTION_NOT_FOUND,
          });
        }

        transactions.push(newTransaction);
      })
    );

    return res.status(HTTP_ERROR_TYPE_NUMBER.SUCCESS).json(transactions);
  } catch (err) {
    console.log(err);
    return res.status(HTTP_ERROR_TYPE_NUMBER.INTERNAL_SERVER_ERROR).json({
      error: HTTP_ERROR_TYPE.INTERNAL_SERVER_ERROR,
      message: HTTP_ERROR_RESPONSE.INTERNAL_SERVER_ERROR,
    });
  }
};

const deleteMany = async (req, res) => {
  try {
    let user = await UserModel.findById(req.params.userId).exec();
    // check if user with the given id exists
    if (!user) {
      return res.status(HTTP_ERROR_TYPE_NUMBER.NOT_FOUND).json({
        error: HTTP_ERROR_TYPE.USER_NOT_FOUND,
        message: HTTP_ERROR_RESPONSE.USER_NOT_FOUND,
      });
    }
    let deletedResult = TransactionModel.deleteMany({
      bankAccountID: req.body.accountId,
    }).exec();

    if (!deletedResult) {
      return res.status(HTTP_ERROR_TYPE_NUMBER.NOT_FOUND).json({
        error: HTTP_ERROR_TYPE.USER_NOT_FOUND,
        message: 'Transactions not found',
      });
    }
    return res.status(HTTP_ERROR_TYPE_NUMBER.SUCCESS).json({ deletedResult });
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
    let transaction = await TransactionModel.findOneAndDelete({
      _id: req.params.transactionId,
      userID: req.params.userId,
    }).exec();
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
  createMany,
  read,
  update,
  updateMany,
  deleteMany,
  remove,
  list,
};
