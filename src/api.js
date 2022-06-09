'use strict';

import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';

import middlewares from './middleware.js';

const api = express();

// Adding Basic Middlewares
api.use(helmet());
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: false }));
api.use(middlewares.allowCrossDomain);

// Basic route
api.get('/', (req, res) => {
    res.json({
        name: 'SEBA Master Movie Backend',
    });
});

export default api;
