'use strict';

// Configuration variables
const port = process.env.PORT || '3001';
const mongoURI =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/budgetly'; //'mongodb://admin:secret@localhost:27017/'
const jwtSecret = process.env.JWT_SECRET || 'budgetly';

export default {
  port,
  mongoURI,
  jwtSecret,
};
