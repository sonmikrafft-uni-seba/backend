'use strict';

import express from 'express';
const router = express.Router();

import middlewares from '../middleware.js';
import BankingController from '../controllers/banking.js';

router.post('/token', BankingController.createToken);
router.post('/token/refresh', BankingController.refreshToken);

router.get('/banks/:country', BankingController.getBankListForCountry);
router.post('/banks/:id/eua', BankingController.getEuaForBank);
router.post('/banks/:id/req', BankingController.getRequisitionForBank);

router.get('/banks/:id/req/:req_id', BankingController.getRequisitionDetails);
router.get(
  '/banks/:id/account/:account_id',
  BankingController.getBankAccountDetails
);
router.get(
  '/banks/:id/account/:account_id/transactions',
  BankingController.getBankAccountTransactions
);

export default router;
