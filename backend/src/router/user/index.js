import express from 'express';

import { authMiddleware } from '../../middleware/auth';
import { fetchUserData, updateUser, destroyUser } from './user.ctrl';

const router = express.Router();

router.get('/token', fetchUserData);
router.put('/', authMiddleware, updateUser);
router.delete('/', authMiddleware, destroyUser);

export default router;
