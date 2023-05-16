import express from 'express';
import { verifyUsersNote } from '../../../middleware/notes/verifyUsersNotes';
import { writeNote } from '../../../controllers/notes/post/add';
import { paramLogConverter } from '../../../middleware/log/paramConverter';

const router = express.Router();

router.use(`/:uid/:id/:logIndex/`, paramLogConverter);

// verifyUserNote for editing
router.post(`/:uid/:id/:logIndex/private`, (req, res, next) => {
   writeNote(req, res, next, false);
});

router.post(`/:uid/:id/:logIndex/public`, (req, res, next) => {
   writeNote(req, res, next, true);
});

export default router;
