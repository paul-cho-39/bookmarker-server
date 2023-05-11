import express from 'express';
import userLogin from './api/login/index';
import library from './api/library/index';
import bookLog from './api/log/index';

const route = express.Router();

// should check every authentication from all routers of user?

// later use forEach or some other function to get all of this
route.use('/api', userLogin);
route.use('/api', library);
route.use('/api', bookLog);

export default route;
