'use strict';
import {
  HTTP_ERROR_TYPE_NUMBER,
  HTTP_ERROR_TYPE,
  HTTP_ERROR_RESPONSE,
} from '../messages.js';
import { bankingID, bankingSecret } from '../config.js';
import fetch from 'node-fetch';

const TOKEN_ENDPOINT_API = 'https://ob.nordigen.com/api/v2/token';
const BANK_LIST_ENDPOINT_API = 'https://ob.nordigen.com/api/v2/institutions';
const AGREEMENT_ENDPOINT_API = 'https://ob.nordigen.com/api/v2/agreements';
const REQUISITIONS_ENDPOINT_API = 'https://ob.nordigen.com/api/v2/requisitions';
const ACCOUNTS_ENDPOINT_API = 'https://ob.nordigen.com/api/v2/accounts';

const createToken = async (req, res) => {
  try {
    const response = await fetch(TOKEN_ENDPOINT_API + '/new/', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-Type': 'application/json',
      },
      body: JSON.stringify({
        secret_id: bankingID,
        secret_key: bankingSecret,
      }),
    });

    const token = await response.json();

    return res.status(HTTP_ERROR_TYPE_NUMBER.SUCCESS).json(token);
  } catch (err) {
    console.log(err);
    return res.status(HTTP_ERROR_TYPE_NUMBER.INTERNAL_SERVER_ERROR).json({
      error: HTTP_ERROR_TYPE.INTERNAL_SERVER_ERROR,
      message: HTTP_ERROR_RESPONSE.INTERNAL_SERVER_ERROR,
    });
  }
};

const refreshToken = async (req, res) => {
  try {
    const response = await fetch(TOKEN_ENDPOINT_API + '/refresh/', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-Type': 'application/json',
      },
      body: JSON.stringify({
        refresh: req.body.refresh,
      }),
    });

    const token = await response.json();

    return res.status(HTTP_ERROR_TYPE_NUMBER.SUCCESS).json(token);
  } catch (err) {
    console.log(err);
    return res.status(HTTP_ERROR_TYPE_NUMBER.INTERNAL_SERVER_ERROR).json({
      error: HTTP_ERROR_TYPE.INTERNAL_SERVER_ERROR,
      message: HTTP_ERROR_RESPONSE.INTERNAL_SERVER_ERROR,
    });
  }
};

const getBankListForCountry = async (req, res) => {
  try {
    const response = await fetch(
      BANK_LIST_ENDPOINT_API + '/?country=' + req.params.country,
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
          'content-Type': 'application/json',
          Authorization: req.headers['authorization-banking'],
        },
      }
    );

    const list = await response.json();

    return res.status(HTTP_ERROR_TYPE_NUMBER.SUCCESS).json(list);
  } catch (err) {
    console.log(err);
    return res.status(HTTP_ERROR_TYPE_NUMBER.INTERNAL_SERVER_ERROR).json({
      error: HTTP_ERROR_TYPE.INTERNAL_SERVER_ERROR,
      message: HTTP_ERROR_RESPONSE.INTERNAL_SERVER_ERROR,
    });
  }
};

const getEuaForBank = async (req, res) => {
  try {
    // add institution id to request
    req.body['institution_id'] = req.params.id;

    const response = await fetch(AGREEMENT_ENDPOINT_API + '/enduser/', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-Type': 'application/json',
        Authorization: req.headers['authorization-banking'],
      },
      body: JSON.stringify(req.body),
    });

    const eua = await response.json();

    return res.status(HTTP_ERROR_TYPE_NUMBER.SUCCESS).json(eua);
  } catch (err) {
    console.log(err);
    return res.status(HTTP_ERROR_TYPE_NUMBER.INTERNAL_SERVER_ERROR).json({
      error: HTTP_ERROR_TYPE.INTERNAL_SERVER_ERROR,
      message: HTTP_ERROR_RESPONSE.INTERNAL_SERVER_ERROR,
    });
  }
};

const getRequisitionForBank = async (req, res) => {
  try {
    req.body['institution_id'] = req.params.id;

    const response = await fetch(REQUISITIONS_ENDPOINT_API + '/', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-Type': 'application/json',
        Authorization: req.headers['authorization-banking'],
      },
      body: JSON.stringify(req.body),
    });

    const requisition = await response.json();

    return res.status(HTTP_ERROR_TYPE_NUMBER.SUCCESS).json(requisition);
  } catch (err) {
    console.log(err);
    return res.status(HTTP_ERROR_TYPE_NUMBER.INTERNAL_SERVER_ERROR).json({
      error: HTTP_ERROR_TYPE.INTERNAL_SERVER_ERROR,
      message: HTTP_ERROR_RESPONSE.INTERNAL_SERVER_ERROR,
    });
  }
};

const getRequisitionDetails = async (req, res) => {
  try {
    const response = await fetch(
      REQUISITIONS_ENDPOINT_API + '/' + req.params.req_id + '/',
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
          'content-Type': 'application/json',
          Authorization: req.headers['authorization-banking'],
        },
      }
    );

    const details = await response.json();

    return res.status(HTTP_ERROR_TYPE_NUMBER.SUCCESS).json(details);
  } catch (err) {
    console.log(err);
    return res.status(HTTP_ERROR_TYPE_NUMBER.INTERNAL_SERVER_ERROR).json({
      error: HTTP_ERROR_TYPE.INTERNAL_SERVER_ERROR,
      message: HTTP_ERROR_RESPONSE.INTERNAL_SERVER_ERROR,
    });
  }
};

const getBankAccountDetails = async (req, res) => {
  try {
    const response = await fetch(
      ACCOUNTS_ENDPOINT_API + '/' + req.params.account_id + '/details/',
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
          'content-Type': 'application/json',
          Authorization: req.headers['authorization-banking'],
        },
      }
    );

    let details = await response.json();
    details['account']['id'] = req.params.account_id;

    return res.status(HTTP_ERROR_TYPE_NUMBER.SUCCESS).json(details);
  } catch (err) {
    console.log(err);
    return res.status(HTTP_ERROR_TYPE_NUMBER.INTERNAL_SERVER_ERROR).json({
      error: HTTP_ERROR_TYPE.INTERNAL_SERVER_ERROR,
      message: HTTP_ERROR_RESPONSE.INTERNAL_SERVER_ERROR,
    });
  }
};

const getBankAccountTransactions = async (req, res) => {
  try {
    const response = await fetch(
      ACCOUNTS_ENDPOINT_API + '/' + req.params.account_id + '/transactions/',
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
          'content-Type': 'application/json',
          Authorization: req.headers['authorization-banking'],
        },
      }
    );

    const transactions = await response.json();

    return res.status(HTTP_ERROR_TYPE_NUMBER.SUCCESS).json(transactions);
  } catch (err) {
    console.log(err);
    return res.status(HTTP_ERROR_TYPE_NUMBER.INTERNAL_SERVER_ERROR).json({
      error: HTTP_ERROR_TYPE.INTERNAL_SERVER_ERROR,
      message: HTTP_ERROR_RESPONSE.INTERNAL_SERVER_ERROR,
    });
  }
};

export default {
  createToken,
  refreshToken,
  getBankListForCountry,
  getEuaForBank,
  getRequisitionForBank,
  getRequisitionDetails,
  getBankAccountDetails,
  getBankAccountTransactions,
};
