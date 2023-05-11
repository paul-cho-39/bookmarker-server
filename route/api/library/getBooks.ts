import express from 'express';
// bundle this together
import getBookData from '../../../middleware/library/getBookData';

import {
   getUserBooks,
   getUsersCurrentlyReading,
   googleThumbnail,
} from '../../../controllers/library';

const router = express.Router();

router.get('/thumbnail/:id', getBookData, googleThumbnail);
router.get('/books/:uid', getUserBooks);
router.get('/current/:uid', getUsersCurrentlyReading);

export default router;
