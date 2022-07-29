'use strict';

import express from 'express';
const router = express.Router();

import middlewares from '../middleware.js';
import UserController from '../controllers/user.js';

router.post('/', UserController.create); // create new user
//router.get('/', middlewares.checkAuthentication, UserController.list); // list all users
router.get(
  '/:id',
  middlewares.checkAuthentication,
  middlewares.checkAuthorization,
  UserController.read
); //read user by id
router.put(
  '/:id',
  middlewares.checkAuthentication,
  middlewares.checkAuthorization,
  UserController.update
); // update user by id
router.delete(
  '/:id',
  middlewares.checkAuthentication,
  middlewares.checkAuthorization,
  UserController.remove
); // delete user by id

export default router;
