'use strict';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {
  HTTP_ERROR_TYPE_NUMBER,
  HTTP_ERROR_TYPE,
  HTTP_ERROR_RESPONSE,
} from '../messages.js';
import { SubscriptionPlan } from '../models/constants.js';
import { jwtSecret, jwtLifeTime } from '../config.js';
import UserModel from '../models/user.js';

const create = async (req, res) => {
  // check if the body of the request contains all necessary properties
  if (!Object.prototype.hasOwnProperty.call(req.body, 'password'))
    return res.status(HTTP_ERROR_TYPE_NUMBER.BAD_REQUEST).json({
      error: HTTP_ERROR_TYPE.BAD_REQUEST,
      message: HTTP_ERROR_RESPONSE.MISSING_PW,
    });

  if (!Object.prototype.hasOwnProperty.call(req.body, 'email'))
    return res.status(HTTP_ERROR_TYPE_NUMBER.BAD_REQUEST).json({
      error: HTTP_ERROR_TYPE.BAD_REQUEST,
      message: HTTP_ERROR_RESPONSE.MISSING_MAIL,
    });

  if (!Object.prototype.hasOwnProperty.call(req.body, 'firstname'))
    return res.status(HTTP_ERROR_TYPE_NUMBER.BAD_REQUEST).json({
      error: HTTP_ERROR_TYPE.BAD_REQUEST,
      message: HTTP_ERROR_RESPONSE.MISSING_FIRSTNAME,
    });

  if (!Object.prototype.hasOwnProperty.call(req.body, 'lastname'))
    return res.status(HTTP_ERROR_TYPE_NUMBER.BAD_REQUEST).json({
      error: HTTP_ERROR_TYPE.BAD_REQUEST,
      message: HTTP_ERROR_RESPONSE.MISSING_LASTNAME,
    });

  // handle the request
  try {
    // hash the password before storing it in the database
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);

    // create a user object
    const user = {
      email: req.body.email,
      firstName: req.body.firstname,
      lastName: req.body.lastname,
      email: req.body.email,
      password: hashedPassword,
      subscriptionPlan: SubscriptionPlan.FREE,
    };

    // create the user in the database
    let retUser = await UserModel.create(user);

    // if user is registered without errors
    // create a token
    const token = jwt.sign(
      {
        _id: retUser._id,
        email: retUser.email,
        subscriptionPlan: retUser.subscriptionPlan,
      },
      jwtSecret,
      {
        expiresIn: jwtLifeTime,
      }
    );

    // return generated token
    res.status(HTTP_ERROR_TYPE_NUMBER.SUCCESS).json({
      token: token,
    });
  } catch (err) {
    if (err.code == 11000) {
      return res.status(HTTP_ERROR_TYPE_NUMBER.BAD_REQUEST).json({
        error: HTTP_ERROR_TYPE.USER_EXISTS,
        message: err.message,
      });
    } else {
      return res.status(HTTP_ERROR_TYPE_NUMBER.INTERNAL_SERVER_ERROR).json({
        error: HTTP_ERROR_RESPONSE.INTERNAL_SERVER_ERROR,
        message: err.message,
      });
    }
  }
};

const read = async (req, res) => {};

const update = async (req, res) => {};

const remove = async (req, res) => {};

const list = async (req, res) => {
  try {
    let users = await UserModel.find({}).exec();

    return res.status(200).json(movies);
  } catch (err) {
    return res.status(500).json({
      error: 'Internal server error',
      message: err.message,
    });
  }
};

export default {
  create,
  read,
  update,
  remove,
  list,
};
