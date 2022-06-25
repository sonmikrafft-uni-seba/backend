'use strict';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import {
  HTTP_ERROR_RESPONSE,
  HTTP_ERROR_TYPE,
  HTTP_ERROR_TYPE_NUMBER,
} from '../messages.js';
import { jwtLifeTime, jwtSecret } from '../config.js';

const login = async (req, res) => {
  // validate that all required fields are provided in request body
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

  // check password and create token
  try {
    // get the user from database
    let user = await User.findOne({
      email: req.body.email,
    }).exec();

    // check if the password is valid
    const isPasswordValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!isPasswordValid)
      return res.status(HTTP_ERROR_TYPE_NUMBER.UNAUTHORIZED).json({
        error: HTTP_ERROR_TYPE.UNAUTHORIZED,
        message: HTTP_ERROR_RESPONSE.USER_CREDS_WRONG,
      });

    // if user is found and password is valid
    // create a token
    const token = jwt.sign(
      {
        _id: user._id,
        email: user.email,
        subscriptionPlan: user.subscriptionPlan,
      },
      jwtSecret,
      {
        expiresIn: jwtLifeTime,
      }
    );

    return res.status(HTTP_ERROR_TYPE_NUMBER.SUCCESS).json({
      token: token,
    });
  } catch (err) {
    return res.status(HTTP_ERROR_TYPE_NUMBER.NOT_FOUND).json({
      error: HTTP_ERROR_TYPE.USER_NOT_FOUND,
      message: err.message,
    });
  }
};

const logout = (req, res) => {
  // not used, client deletes own token
  res.status(HTTP_ERROR_TYPE_NUMBER.SUCCESS).send({ token: null });
};

export default {
  login,
  logout,
};
