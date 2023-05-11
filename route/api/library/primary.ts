import express from 'express';
import { editPrimary } from '../../../controllers/library/selectPrimary';

const router = express.Router();

router.post('/:uid/:id/edit-primary', editPrimary);

export default router;
