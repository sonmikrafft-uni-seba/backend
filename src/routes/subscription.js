'use strict';

import express from 'express';
const router = express.Router();
import SubscriptionController from '../controllers/subscription.js';
import middlewares from '../middleware.js';

router.post(
  '/:userId/subscription',
  middlewares.checkAuthentication,
  middlewares.checkAuthorization,
  SubscriptionController.create
); // create stripe subscription
router.post(
  '/:userId/subscription/cancel',
  middlewares.checkAuthentication,
  middlewares.checkAuthorization,
  SubscriptionController.cancel
); // cancel stripe subscription
router.get(
  '/:userId/subscription/all',
  middlewares.checkAuthentication,
  middlewares.checkAuthorization,
  SubscriptionController.list
); // get subscriptions of a user
router.get(
  '/:userId/subscription/config',
  middlewares.checkAuthentication,
  middlewares.checkAuthorization,
  SubscriptionController.config
); // public config of stripe
export default router;
