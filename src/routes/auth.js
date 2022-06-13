"use strict";

import express from express;
import router from express.Router();

import middlewares from '../middleware.js';
import AuthController from '../controllers/auth';

router.post('/login', AuthController.login);
router.get('/logout', middlewares.checkAuthentication, AuthController.logout);

module.exports = router;