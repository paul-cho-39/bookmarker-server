import express from 'express';

const router = express.Router();
import authentication from './authentication';

router.use('/user', authentication);

export default router;
