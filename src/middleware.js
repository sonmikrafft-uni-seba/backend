'use strict';

import jwt from 'jsonwebtoken';

import { jwtSecret } from './config.js';

const allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', '*');

  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.status(200).send(200);
  } else {
    next();
  }
};

const checkAuthentication = (req, res, next) => {
  // check header or url parameters or post parameters for token
  let token = '';
  if (req.headers.authorization) {
    token = req.headers.authorization.substring(4);
  }

  if (!token)
    return res.status(401).send({
      error: 'Unauthorized',
      message: 'No token provided in the request',
    });

  // verifies secret and checks exp
  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err)
      return res.status(401).send({
        error: 'Unauthorized',
        message: 'Failed to authenticate token.',
      });

    // if everything is good, save to request for use in other routes
    req.userId = decoded.id;
    next();
  });
};

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  res.render('error', { error: err });
};

export default {
  allowCrossDomain,
  checkAuthentication,
  errorHandler,
};
