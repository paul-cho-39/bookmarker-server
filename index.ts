import dotenv from 'dotenv';
import express from 'express';
import allRoutes from './route/index';
import app from './express';

import errorHandler from './middleware/errorhandler';

// to set the env path for applicationDefault to read
// $env=<TO_SERVICE_ACCOUNT>.json
import { initializeApp, applicationDefault } from 'firebase-admin/app';
const auth = initializeApp({
   credential: applicationDefault(),
});

dotenv.config();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// get all routes
app.use(allRoutes);
app.use(errorHandler);

app.listen(port, () => {
   console.log(`The server is working from port ${port}`);
});

// instead of app.use -> have to create a mapping!
// look into this: https://github.com/expressjs/express/blob/master/examples/route-map/index.js
// TODO: have to write "errorMiddleware" to catch some of
// the errors
