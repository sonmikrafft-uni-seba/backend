'use strict';

import express from 'express';
const router = express.Router();

import SubscriptionController from '../controllers/subscription.js';

router.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  SubscriptionController.handleWebhook
); // listner of stripe webhook
export default router;
