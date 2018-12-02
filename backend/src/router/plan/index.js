import express from 'express';

import { authMiddleware } from '../../middleware/auth';

import { getPlans, initializePlan } from './plan';

const router = express.Router();

router.get('/', authMiddleware, getPlans);
router.post('/init', authMiddleware, initializePlan);

export default router;
