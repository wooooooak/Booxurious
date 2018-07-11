import * as express from 'express';
const router = express.Router();

import user from './user';

router.get('/hello', (req: express.Request, res: express.Response) => {
  return res.json({ hello: 'world' });
});

router.use('/user', user);

export default router;
