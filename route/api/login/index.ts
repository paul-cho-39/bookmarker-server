import express, { ErrorRequestHandler, Request, Response, NextFunction } from 'express';

import deleteAccount from './deleteAccount';
import provider from './provider';
import signin from './signin';
import singout from './signout';
import signup from './signup';

const route = express.Router();

route.use('/user', deleteAccount);
route.use('/user', provider);
route.use('/user', signin);
route.use('/user', singout);
route.use('/user', signup);

export default route;
