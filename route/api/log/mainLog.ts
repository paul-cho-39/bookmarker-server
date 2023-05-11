// likely to change name
import express from 'express';
import {
   addLogManually,
   startLog,
   endLog,
   toggleFavoriteSession,
   deleteSingleLog,
   getUsersCurrentlyReadingLog,
} from './../../../controllers/logs';

import { checkBookmarkedValue } from '../../../middleware/log/favoriteSession';
const router = express.Router();

router.get('/:uid/:id/current-log', getUsersCurrentlyReadingLog);
router.post('/:uid/:id/manual-log', addLogManually);

// or is there a way for cleaning up old logs?
router.post('/:uid/:id/start', startLog);
// do not increase the logIndex(?) if the startTime has not passed 12 hours mark
router.post('/:uid/:id/:logIndex/end', endLog);

router.post(`/:uid/:id/:logIndex/favorite-session`, checkBookmarkedValue, toggleFavoriteSession);

router.delete('/:uid/:id/:logIndex/delete', deleteSingleLog);

export default router;
