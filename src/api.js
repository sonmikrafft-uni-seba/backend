'use strict';

import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';

import middlewares from './middleware.js';

import auth from './routes/auth';
import user from './routes/user';

const api = express();

// Adding Basic Middlewares
api.use(helmet());
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: false }));
api.use(middlewares.allowCrossDomain);

// Basic route
api.get('/', (req, res) => {
  res.json({
    name: 'SEBA Master Movie Backend',
  });
});

// API routes
api.use('/auth', auth);
api.use('/user', user);

export default api;
