import * as express from 'express';
import AuthCtrl from './AuthCtrl';
import { authRules } from './authRules';

const auth: express.Router = express.Router();
const authCtrl: AuthCtrl = new AuthCtrl();

auth.post('/register/local', authRules['forLocalRegister'], authCtrl.createLocalAccount);
auth.post('/login/local', authCtrl.loginLocalAccount);
auth.get('/test', authCtrl.test);
export default auth;
