'use strict';

// Configuration variables
const port = process.env.PORT || '3001';
const mongoURI =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/budgetly';
const jwtSecret = process.env.JWT_SECRET || 'budgetly';
const jwtLifeTime = process.env.JWT_LIFE_TIME || 86400; // 24h
const bankingSecret =
  process.env.BANKING_SECRET ||
  'f71836026d78e72ab2d9778faef16088d420e17bfd848d95e9ea73ca779b85ce52a08e18c59bef30aa06374e32051c9113072faf4f61642a1cf8c7758619aab2';
const bankingID =
  process.env.BANKING_ID || '06122eb5-39cc-407e-995b-5e4452bbba57';

export { port, mongoURI, jwtSecret, jwtLifeTime, bankingID, bankingSecret };
