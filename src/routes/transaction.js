"use strict";

import express from 'express';
const router = express.Router();

import middlewares from '../middleware.js';
import TransactionController from '../controllers/transaction.js';

router.post('/:id', middlewares.checkAuthentication, TransactionController.create); // create new transaction
router.get('/:id', middlewares.checkAuthentication, TransactionController.list); // list all transactions
router.get('/:id/:id', middlewares.checkAuthentication, TransactionController.read); //read transaction by id
router.put('/:id/:id', middlewares.checkAuthentication, TransactionController.update); // update transaction by id
router.delete('/:id/:id', middlewares.checkAuthentication, TransactionController.remove); // delete transaction by id

export default router;