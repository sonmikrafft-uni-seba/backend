"use strict";

import express from express;
import router from express.Router();

import middlewares from '../middleware.js';
import TransactionController from '../controllers/user/transaction';

router.post('/:id', middlewares.checkAuthentication, TransactionController.create); // create new transaction
router.get('/:id', middlewares.checkAuthentication, TransactionController.list); // list all transactions
router.get('/:id/:id', middlewares.checkAuthentication, TransactionController.read); //read transaction by id
router.put('/:id/:id', middlewares.checkAuthentication, TransactionController.update); // update transaction by id
router.delete('/:id/:id', middlewares.checkAuthentication, TransactionController.remove); // delete transaction by id

module.exports = router;