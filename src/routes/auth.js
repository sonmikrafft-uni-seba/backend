"use strict";

import express from 'express';
const router = express.Router();

import middlewares from '../middleware.js';
import AuthController from '../controllers/auth.js';

router.post('/login', AuthController.login);
router.get('/logout', middlewares.checkAuthentication, AuthController.logout);

export default router;