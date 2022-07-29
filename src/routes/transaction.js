'use strict';

import express from 'express';
const router = express.Router();

import middlewares from '../middleware.js';
import TransactionController from '../controllers/transaction.js';

router.post(
  '/:userId/transaction/',
  middlewares.checkAuthentication,
  middlewares.checkAuthorization,
  TransactionController.create
); // create new transaction
router.get(
  '/:userId/transaction/',
  middlewares.checkAuthentication,
  middlewares.checkAuthorization,
  TransactionController.list
); // list all transactions
router.put(
  '/:userId/transaction/reassign',
  middlewares.checkAuthentication,
  middlewares.checkAuthorization,
  TransactionController.updateMany
); // list all transactions
router.post(
  '/:userId/transaction/many',
  middlewares.checkAuthentication,
  middlewares.checkAuthorization,
  TransactionController.createMany
); // create new transaction
router.get(
  '/:userId/transaction/:transactionId',
  middlewares.checkAuthentication,
  middlewares.checkAuthorization,
  TransactionController.read
); //read transaction by id
router.put(
  '/:userId/transaction/:transactionId',
  middlewares.checkAuthentication,
  middlewares.checkAuthorization,
  TransactionController.update
); // update transaction by id
router.delete(
  '/:userId/transaction/many',
  middlewares.checkAuthentication,
  TransactionController.deleteMany
); // delete transaction by account id
router.delete(
  '/:userId/transaction/:transactionId',
  middlewares.checkAuthentication,
  middlewares.checkAuthorization,
  TransactionController.remove
); // delete transaction by id
export default router;
