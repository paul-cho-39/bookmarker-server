import express from 'express';
import { editPrimary } from '../../../controllers/library/post/selectPrimary';

const router = express.Router();

router.post('/:uid/:id/edit-primary', editPrimary);

export default router;
