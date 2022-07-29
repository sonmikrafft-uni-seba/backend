'use strict';

import jwt from 'jsonwebtoken';

import { jwtSecret } from './config.js';
import { HTTP_ERROR_TYPE, HTTP_ERROR_TYPE_NUMBER } from './messages.js';

const allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', '*');

  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res
      .status(HTTP_ERROR_TYPE_NUMBER.SUCCESS)
      .send(HTTP_ERROR_TYPE_NUMBER.SUCCESS);
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
    return res.status(HTTP_ERROR_TYPE_NUMBER.UNAUTHORIZED).send({
      error: HTTP_ERROR_TYPE.UNAUTHORIZED,
      message: 'No token provided in the request',
    });

  // verifies secret and checks exp
  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err)
      return res.status(HTTP_ERROR_TYPE_NUMBER.UNAUTHORIZED).send({
        error: HTTP_ERROR_TYPE.UNAUTHORIZED,
        message: 'Failed to authenticate token.',
      });

    req.userId = decoded._id;
    next();
  });
};

const checkAuthorization = (req, res, next) => {
  if (
    !(
      req.params &&
      (req.params.id == req.userId || req.params.userId == req.userId)
    )
  ) {
    return res.status(HTTP_ERROR_TYPE_NUMBER.UNAUTHORIZED).send({
      error: HTTP_ERROR_TYPE.UNAUTHORIZED,
      message: 'Permission denied.',
    });
  }

  next();
};

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(HTTP_ERROR_TYPE_NUMBER.INTERNAL_SERVER_ERROR);
  res.render('error', { error: err });
};

export default {
  allowCrossDomain,
  checkAuthentication,
  checkAuthorization,
  errorHandler,
};
