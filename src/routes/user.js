"use strict";

import express from express;
import router from express.Router();

import middlewares from '../middleware.js';
import UserController from '../controllers/user';

router.post('/', middlewares.checkAuthentication, UserController.create); // create new user
router.get('/', UserController.list); // list all users
router.get('/:id', middlewares.checkAuthentication, UserController.read); //read user by id
router.put('/:id', middlewares.checkAuthentication, UserController.update); // update user by id
router.delete('/:id', middlewares.checkAuthentication, UserController.remove); // delete user by id

module.exports = router;