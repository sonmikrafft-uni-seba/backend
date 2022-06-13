"use strict";

import express from express;
import router from express.Router();

import middlewares from '../middleware.js';
import TransactionController from '../controllers/user'; //TODO: user mit transaction ersetzen!

router.post('/', middlewares.checkAuthentication, TransactionController.create); // create new transaction
router.get('/', middlewares.checkAuthentication, TransactionController.list); // list all transactions
router.get('/:id:', middlewares.checkAuthentication, TransactionController.read); //read transaction by id
router.put('/:id', middlewares.checkAuthentication, TransactionController.update); // update transaction by id
router.delete('/:id', middlewares.checkAuthentication, TransactionController.remove); // delete transaction by id

module.exports = router;