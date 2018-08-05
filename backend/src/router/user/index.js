import express from 'express';
import { fetchUserData } from './user.ctrl';

const router = express.Router();

router.get('/token', fetchUserData);

export default router;
