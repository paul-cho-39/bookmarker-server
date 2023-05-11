import express, { Request } from 'express';
import addLog from './addLog';
import getLog from './getLogs';
import editLog from './editLogs';

const router = express.Router();

router.use('/book-log', addLog);
router.use('/book-log', getLog);
router.use('/book-log', editLog);

export default router;
