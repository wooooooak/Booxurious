import express from 'express';

import user from './user';
import auth from './auth';
import post from './post';
import folder from './folder';

const router = express.Router();

router.use('/user', user);
router.use('/auth', auth);
router.use('/post', post);
router.use('/folder', folder);

export default router;
