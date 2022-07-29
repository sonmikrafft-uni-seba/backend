'use strict';

// Configuration variables
const port = process.env.PORT || '3001';
const mongoURI =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/budgetly';
const jwtSecret = process.env.JWT_SECRET || 'budgetly';
const jwtLifeTime = 86400 * 30; // 24h * 30 Tage
const stripePublicKey =
  process.env.STRIPE_PUBLIC_KEY ||
  'pk_test_51LGILDLQApau8IOPIJbVZ0ry8xXs2z7b6NCwk9x3u0SA6byGKa6craVKnmADMUB7D4qashBkqAEFLHVc2sSuePOx008p2yiMME';
const stripePrivateKey =
  process.env.STRIPE_PRIVATE_KEY ||
  'sk_test_51LGILDLQApau8IOPP5BYhuA6eS1MjQqS1uDEu2Ui9ZSZDTpEPPXl67f8KsjZPHg5iFbzYRAluEdy92cOj5Wf4oRo00uR1oCtpk';
const stripeEndpointSecret =
  process.env.STRIPE_ENDPOINT_SECRET ||
  'whsec_b30c545758fbdf2a88138d0b4bd49666abe7463762239f02f66729715a25b8cb';

const premiumPriceId =
  process.env.PREMIUM_PRICE_ID || 'price_1LHlYWLQApau8IOPnygwR6dB';
const bankingSecret =
  process.env.BANKING_SECRET ||
  'f71836026d78e72ab2d9778faef16088d420e17bfd848d95e9ea73ca779b85ce52a08e18c59bef30aa06374e32051c9113072faf4f61642a1cf8c7758619aab2';
const bankingID =
  process.env.BANKING_ID || '06122eb5-39cc-407e-995b-5e4452bbba57';
const frontendBaseUrl = 'http://localhost:3000';
export {
  port,
  mongoURI,
  jwtSecret,
  jwtLifeTime,
  stripePublicKey,
  stripePrivateKey,
  stripeEndpointSecret,
  premiumPriceId,
  bankingID,
  bankingSecret,
  frontendBaseUrl,
};
