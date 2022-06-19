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

/**
 * Create new user in database
 */
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

  let existingUser = await UserModel.findOne({
    email: req.body.email,
  }).exec();

  if (existingUser) {
    return res.status(HTTP_ERROR_TYPE_NUMBER.BAD_REQUEST).json({
      error: HTTP_ERROR_TYPE.USER_EXISTS,
      message: HTTP_ERROR_RESPONSE.USER_ALREADY_EXISTS,
    });
  }

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
      user: retUser,
      token: token,
    });
  } catch (err) {
    console.log(err);
    return res.status(HTTP_ERROR_TYPE_NUMBER.INTERNAL_SERVER_ERROR).json({
      error: HTTP_ERROR_TYPE.INTERNAL_SERVER_ERROR,
      message: HTTP_ERROR_RESPONSE.INTERNAL_SERVER_ERROR,
    });
  }
};

/**
 * returns a user with specific id from database
 */
const read = async (req, res) => {
  try {
    let wantedUser = await UserModel.findById(req.params.id).exec();

    // check if user with the given id exists
    if (!wantedUser) {
      return res.status(HTTP_ERROR_TYPE_NUMBER.NOT_FOUND).json({
        error: HTTP_ERROR_TYPE.USER_NOT_FOUND,
        message: HTTP_ERROR_RESPONSE.USER_NOT_FOUND,
      });
    }

    // return user with the given id
    return res.status(HTTP_ERROR_TYPE_NUMBER.SUCCESS).json(wantedUser);
  } catch (err) {
    console.log(err);
    return res.status(HTTP_ERROR_TYPE_NUMBER.INTERNAL_SERVER_ERROR).json({
      error: HTTP_ERROR_TYPE.INTERNAL_SERVER_ERROR,
      message: HTTP_ERROR_RESPONSE.INTERNAL_SERVER_ERROR,
    });
  }
};

/**
 * updates a user's properties in database
 */
const update = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(HTTP_ERROR_TYPE_NUMBER.BAD_REQUEST).json({
      error: HTTP_ERROR_TYPE.BAD_REQUEST,
      message: HTTP_ERROR_RESPONSE.EMPTY_REQ_BODY,
    });
  }

  try {
    let updatedUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    ).exec();

    // check if user with the given id exists
    if (!updatedUser) {
      return res.status(HTTP_ERROR_TYPE_NUMBER.NOT_FOUND).json({
        error: HTTP_ERROR_TYPE.USER_NOT_FOUND,
        message: HTTP_ERROR_RESPONSE.USER_NOT_FOUND,
      });
    }

    return res.status(HTTP_ERROR_TYPE_NUMBER.SUCCESS).json(updatedUser);
  } catch (err) {
    console.log(err);
    return res.status(HTTP_ERROR_TYPE_NUMBER.INTERNAL_SERVER_ERROR).json({
      error: HTTP_ERROR_TYPE.INTERNAL_SERVER_ERROR,
      message: HTTP_ERROR_RESPONSE.INTERNAL_SERVER_ERROR,
    });
  }
};

/**
 * deletes a user in database
 */
const remove = async (req, res) => {
  try {
    await UserModel.findByIdAndRemove(req.params.id).exec();

    return res
      .status(HTTP_ERROR_TYPE_NUMBER.SUCCESS)
      .json({ message: `User with id${req.params.id} was deleted` });
  } catch (err) {
    console.log(err);
    return res.status(HTTP_ERROR_TYPE_NUMBER.INTERNAL_SERVER_ERROR).json({
      error: HTTP_ERROR_TYPE.INTERNAL_SERVER_ERROR,
      message: HTTP_ERROR_RESPONSE.INTERNAL_SERVER_ERROR,
    });
  }
};

/**
 * returns a list of all users in database
 */
const list = async (req, res) => {
  try {
    let users = await UserModel.find({}).exec();

    return res.status(HTTP_ERROR_TYPE_NUMBER.SUCCESS).json(users);
  } catch (err) {
    console.log(err);
    return res.status(HTTP_ERROR_TYPE_NUMBER.INTERNAL_SERVER_ERROR).json({
      error: HTTP_ERROR_TYPE.INTERNAL_SERVER_ERROR,
      message: HTTP_ERROR_RESPONSE.INTERNAL_SERVER_ERROR,
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
