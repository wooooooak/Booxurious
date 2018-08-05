import express from 'express';
import { createAccount, loginSocailAccount, test } from './auth.ctrl';
import { authRules } from './authRules';

const auth = express.Router();

auth.post('/register/social', authRules['forLocalRegister'], createAccount);
// auth.post('/login/local', loginLocalAccount);
auth.get('/test', test);
auth.post('/login/social', loginSocailAccount);
export default auth;
