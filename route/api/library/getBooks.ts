import express, { Response, Request, NextFunction } from 'express';
import { Record as NeoRecord } from 'neo4j-driver';
// bundle this together
import getBookData from '../../../middleware/library/getBookData';

import {
   getUserBooks,
   getUsersCurrentlyReading,
   googleThumbnail,
} from '../../../controllers/library';

const router = express.Router();

router.get('/books/:uid', getUserBooks);
router.get('/thumbnail/:id', getBookData, googleThumbnail);
router.get('/current/:uid', getUsersCurrentlyReading);

export default router;
