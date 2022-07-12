'use strict';

import express from 'express';
const router = express.Router();

import middlewares from '../middleware.js';
import TransactionController from '../controllers/transaction.js';

router.post(
  '/:userId/transaction/',
  middlewares.checkAuthentication,
  TransactionController.create
); // create new transaction
router.get(
  '/:userId/transaction/',
  middlewares.checkAuthentication,
  TransactionController.list
); // list all transactions
router.put(
  '/:userId/transaction/reassign',
  middlewares.checkAuthentication,
  TransactionController.updateMany
); // list all transactions
router.post(
  '/:userId/transaction/many',
  middlewares.checkAuthentication,
  TransactionController.createMany
); // create new transaction
router.get(
  '/:userId/transaction/:transactionId',
  middlewares.checkAuthentication,
  TransactionController.read
); //read transaction by id
router.put(
  '/:userId/transaction/:transactionId',
  middlewares.checkAuthentication,
  TransactionController.update
); // update transaction by id
router.delete(
  '/:userId/transaction/:transactionId',
  middlewares.checkAuthentication,
  TransactionController.remove
); // delete transaction by id

export default router;
