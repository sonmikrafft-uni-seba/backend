"use strict";

import jwt from jsonwebtoken;
import bcrypt from bcryptjs;

import config from '../config';
// import AuthModel...


const login = async (req,res) => {
};

const logout = (req, res) => {
    res.status(200).send({ token: null });
};


module.exports = {
    login,
    logout
};