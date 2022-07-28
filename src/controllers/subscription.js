'use strict';

import {
  HTTP_ERROR_TYPE_NUMBER,
  HTTP_ERROR_TYPE,
  HTTP_ERROR_RESPONSE,
} from '../messages.js';
import Stripe from 'stripe';
import UserModel from '../models/user.js';
import {
  stripePrivateKey,
  stripeEndpointSecret,
  stripePublicKey,
  premiumPriceId,
} from '../config.js';
import { SubscriptionPlan } from '../models/constants.js';
const stripe = new Stripe(stripePrivateKey);
const endpointSecret = stripeEndpointSecret;
/**
 * Create a new stripe subscription
 */
const create = async (req, res) => {
  // check if the body of the request contains all necessary properties
  if (!Object.prototype.hasOwnProperty.call(req.body, 'priceId')) {
    return res.status(HTTP_ERROR_TYPE_NUMBER.BAD_REQUEST).json({
      error: HTTP_ERROR_TYPE.BAD_REQUEST,
      message: HTTP_ERROR_RESPONSE.MISSING_PRICE_ID,
    });
  }

  try {
    let user = await UserModel.findById(req.params.userId).exec();

    // check if user with the given id exists
    if (!user) {
      return res.status(HTTP_ERROR_TYPE_NUMBER.NOT_FOUND).json({
        error: HTTP_ERROR_TYPE.USER_NOT_FOUND,
        message: HTTP_ERROR_RESPONSE.USER_NOT_FOUND,
      });
    }

    let subscribingCustomerId = user.customerId ? user.customerId : null;

    // Check whether the user is assigned with a customerId
    if (!user.customerId) {
      // Create the customer on stripe if the property customerId does not exist
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.lastName + ', ' + user.firstName,
      });
      // Something goes wrong with stripe, return error
      if (!customer) {
        return res.status(HTTP_ERROR_TYPE_NUMBER.BAD_REQUEST).json({
          error: HTTP_ERROR_TYPE.BAD_REQUEST,
          message: { message: err.message },
        });
      }
      //Find the user in the database and update its property customerId
      let updatedUser = await UserModel.findByIdAndUpdate(
        req.params.userId,
        { customerId: customer.id },
        {
          new: true,
          runValidators: true,
        }
      ).exec();

      if (!updatedUser) {
        return res.status(HTTP_ERROR_TYPE_NUMBER.NOT_FOUND).json({
          error: HTTP_ERROR_TYPE.USER_NOT_FOUND,
          message: HTTP_ERROR_RESPONSE.USER_NOT_FOUND,
        });
      }
      subscribingCustomerId = customer.id;
    }

    // Create a subscription with the customer Id, and the payment is set to incomplete
    let subscription = await stripe.subscriptions.create({
      customer: subscribingCustomerId,
      items: [{ price: req.body.priceId }],
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
      expand: ['latest_invoice.payment_intent'],
    });
    return res.status(HTTP_ERROR_TYPE_NUMBER.SUCCESS).json({
      subscriptionId: subscription.id,
      clientSecret: subscription.latest_invoice.payment_intent.client_secret,
    }); // Return the client secret to frontend for payment
  } catch (err) {
    return res.status(HTTP_ERROR_TYPE_NUMBER.BAD_REQUEST).json({
      error: HTTP_ERROR_TYPE.BAD_REQUEST,
      message: { message: err.message },
    });
  }
};

// cancel a subscription from stripe
const cancel = async (req, res) => {
  if (!Object.prototype.hasOwnProperty.call(req.body, 'subscriptionId')) {
    return res.status(HTTP_ERROR_TYPE_NUMBER.BAD_REQUEST).json({
      error: HTTP_ERROR_TYPE.BAD_REQUEST,
      message: HTTP_ERROR_RESPONSE.MISSING_SUBSCRIPTION_ID,
    });
  }
  try {
    // Cancel the subscription at the end of the period end
    let cancelledSubscription = await stripe.subscriptions.update(
      req.body.subscriptionId,
      { cancel_at_period_end: true }
    );
    return res
      .status(HTTP_ERROR_TYPE_NUMBER.SUCCESS)
      .json(cancelledSubscription);
  } catch (err) {
    return res.status(HTTP_ERROR_TYPE_NUMBER.BAD_REQUEST).json({
      error: HTTP_ERROR_TYPE.BAD_REQUEST,
      message: { message: err.message },
    });
  }
};

// list all subscriptions from stripe
const list = async (req, res) => {
  let user = await UserModel.findById(req.params.userId).exec();

  // check if user with the given id exists
  if (!user) {
    return res.status(HTTP_ERROR_TYPE_NUMBER.NOT_FOUND).json({
      error: HTTP_ERROR_TYPE.USER_NOT_FOUND,
      message: HTTP_ERROR_RESPONSE.USER_NOT_FOUND,
    });
  }
  try {
    const subscriptions = await stripe.subscriptions.retrieve({
      customer: user.customerId,
      status: 'active',
      expand: ['data.default_payment_method'],
    });
    return res.status(HTTP_ERROR_TYPE_NUMBER.SUCCESS).json(subscriptions);
  } catch (err) {
    return res.status(HTTP_ERROR_TYPE_NUMBER.BAD_REQUEST).json({
      error: HTTP_ERROR_TYPE.BAD_REQUEST,
      message: { message: err.message },
    });
  }
};

const handleWebhook = async (req, res) => {
  let event;
  if (endpointSecret) {
    // Get the signature sent by Stripe
    const signature = req.headers['stripe-signature'];
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        endpointSecret
      );
    } catch (err) {
      console.log(`Webhook signature verification failed.`, err.message);
      return res.status(HTTP_ERROR_TYPE_NUMBER.BAD_REQUEST).json({
        error: HTTP_ERROR_TYPE.BAD_REQUEST,
        message: { message: err.message },
      });
    }
  }

  // Extract the object from the event.
  const dataObject = event.data.object;

  // Handle the event
  switch (event.type) {
    case 'invoice.payment_succeeded':
      if (dataObject['billing_reason'] == 'subscription_create') {
        // The subscription automatically activates after successful payment
        // Set the payment method used to pay the first invoice as the default payment method for that subscription
        const subscription_id = dataObject['subscription'];
        const payment_intent_id = dataObject['payment_intent'];
        const success_customer_id = dataObject['customer'];
        // Retrieve the payment intent used to pay the subscription
        const payment_intent = await stripe.paymentIntents.retrieve(
          payment_intent_id
        );

        try {
          const subscription = await stripe.subscriptions.update(
            subscription_id,
            {
              default_payment_method: payment_intent.payment_method,
            }
          );

          // Update the user's subscription plan in our database
          const paymentSuccessUser = await UserModel.findOneAndUpdate(
            {
              customerId: success_customer_id,
            },
            {
              subscriptionPlan: SubscriptionPlan.PREMIUM,
              activeSubscriptionId: subscription_id,
            },
            { returnDocument: 'after' }
          );
          if (!paymentSuccessUser) {
            console.log('Failed to update subscription plan in database');
          }
        } catch (err) {
          console.log(err);
          console.log(
            `Falied to update the default payment method for subscription: ${subscription_id}`
          );
        }
      }
      break;
    case 'invoice.payment_failed':
      break;
    case 'customer.subscription.updated':
      if (dataObject['cancel_at_period_end'] == true) {
        const current_period_end_timestamp = dataObject['current_period_end'];
        const success_customer_id = dataObject['customer'];
        const current_period_end = timeConverter(current_period_end_timestamp);
        const updateSuccessUser = await UserModel.findOneAndUpdate(
          {
            customerId: success_customer_id,
          },
          {
            subscriptionCancelDate: current_period_end,
          },
          { returnDocument: 'after' }
        );
        if (!updateSuccessUser) {
          console.log('Failed to update subscription plan in database');
        }
      }
      break;
    case 'customer.subscription.deleted':
      if (event.request != null) {
        const deleted_customer_id = dataObject['customer'];
        const deletionSuccessUser = await UserModel.findOneAndUpdate(
          {
            customerId: deleted_customer_id,
          },
          {
            subscriptionPlan: SubscriptionPlan.FREE,
            activeSubscriptionId: undefined,
            subscriptionCancelDate: undefined,
          },
          { returnDocument: 'after' }
        );
        if (!deletionSuccessUser) {
          console.log('Failed to update subscription plan in database');
        }
        break;
      }
      break;
    default:
      // Unexpected event type
      return res
        .status(HTTP_ERROR_TYPE_NUMBER.SUCCESS)
        .json({ received: true });
  }
  return res.status(HTTP_ERROR_TYPE_NUMBER.SUCCESS).json({ received: true });
};

// Public key and
const config = async (_, res) => {
  return res.status(HTTP_ERROR_TYPE_NUMBER.SUCCESS).json({
    publicKey: stripePublicKey,
    priceId: premiumPriceId,
  });
};

const timeConverter = (UNIX_timestamp) => {
  var a = new Date(UNIX_timestamp * 1000);
  var months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var formattedDate = month + ' ' + date + ', ' + year;
  return formattedDate;
};

export default {
  create,
  cancel,
  list,
  handleWebhook,
  config,
};
