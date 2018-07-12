import * as express from 'express';

import user from './user';
import auth from './auth';

const router: express.Router = express.Router();

router.use('/user', user);
router.use('/auth', auth);

export default router;
