'use strict';

// Configuration variables
const port = process.env.PORT || '3001';
const mongoURI =
  process.env.MONGODB_URI ||
  'mongodb://admin:secret@0.0.0.0:27017/budgetly?authSource=admin';
const jwtSecret = process.env.JWT_SECRET || 'budgetly';
const jwtLifeTime = process.env.JWT_LIFE_TIME || 86400; // 24h

export { port, mongoURI, jwtSecret, jwtLifeTime };
