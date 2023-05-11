import express, { Request } from 'express';
import primary from './primary';
import getBooks from './getBooks';
import library from './userLibrary';

import authenticateUser from '../../../middleware/authenticateUser';
import getBookData from '../../../middleware/library/getBookData';

const router = express.Router();

// middleware
router.use('/library/authenticate/:uid', authenticateUser);
router.use('/library/authenticate/:uid/:id', getBookData);

// routes
router.use('/library', getBooks);
router.use('/library/edit', primary);
router.use('/library/authenticate', library);

export default router;
