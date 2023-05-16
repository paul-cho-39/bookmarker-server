// likely to change name
import express from 'express';
import {
   addLogManually,
   startLog,
   endLog,
   toggleFavoriteSession,
   deleteSingleLog,
   getUsersCurrentlyReadingLog,
   getUsersLogByBook,
} from './../../../controllers/logs';

import { checkBookmarkedValue } from '../../../middleware/log/favoriteSession';
import { paramLogConverter } from '../../../middleware/log/paramConverter';
import { processDates } from '../../../middleware/dateHandler';
const router = express.Router();

router.use('/:uid/:id/:logIndex', paramLogConverter);

router.get('/:uid/:id/current-log', getUsersCurrentlyReadingLog);
router.get('/:uid/:id/book-logs', getUsersLogByBook);
router.post('/:uid/:id/manual-log', addLogManually);

// or is there a way for cleaning up old logs?
router.post('/:uid/:id/start', processDates, startLog);

// do not increase the logIndex(?) if the startTime has not passed 12 hours mark
// if the 12 hour comes from the setting along with the body then it is the settings mark
router.post('/:uid/:id/:logIndex/end', endLog);
router.post(`/:uid/:id/:logIndex/favorite-session`, checkBookmarkedValue, toggleFavoriteSession);
router.delete('/:uid/:id/:logIndex/delete', deleteSingleLog);

export default router;
