import express, { Request } from 'express';
import addBooks from './addBook';
import getBooks from './getBooks';
import editBook from './editBook';

import authenticateUser from '../../../middleware/authenticateUser';
import getBookData from '../../../middleware/library/getBookData';

const router = express.Router();

// middleware
router.use('/library/authenticate/:uid', authenticateUser);
router.use('/library/authenticate/:uid/:id', getBookData);

// routes
router.use('/library', getBooks);
router.use('/library/edit', editBook);
router.use('/library/authenticate', addBooks);

export default router;
