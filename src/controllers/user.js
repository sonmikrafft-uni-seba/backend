"use strict";

import UserModel from '../models/user.js';


const create = async (req, res) => {
};

const read = async (req, res) => {
};

const update = async (req, res) => {
};

const remove = async (req, res) => {
};

const list  = async (req, res) => {
    try {
      let users = await UserModel.find({}).exec();
    
        return res.status(200).json(movies);
      } catch(err) {
        return res.status(500).json({
          error: 'Internal server error',
          message: err.message
        });
      }
};


export default {
    create,
    read,
    update,
    remove,
    list
};
