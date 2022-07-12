'use strict';

import express from 'express';
const router = express.Router();
import SubscriptionController from '../controllers/subscription.js';
import middlewares from '../middleware.js';

router.post(
  '/:userId/subscription',
  middlewares.checkAuthentication,
  SubscriptionController.create
); // create stripe subscription
router.post(
  '/:userId/subscription/cancel',
  middlewares.checkAuthentication,
  SubscriptionController.cancel
); // cancel stripe subscription
router.get(
  '/:userId/subscription/all',
  middlewares.checkAuthentication,
  SubscriptionController.list
); // get subscriptions of a user
router.get(
  '/:userId/subscription/config',
  middlewares.checkAuthentication,
  SubscriptionController.config
); // public config of stripe
export default router;
