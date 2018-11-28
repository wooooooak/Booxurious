import express from 'express';

import { authMiddleware } from '../../middleware/auth';

import { getPlans } from './plan';

const router = express.Router();

router.get('/', authMiddleware, getPlans);

export default router;
