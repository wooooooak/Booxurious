import express from 'express';
import { createAccount, loginSocailAccount } from './auth.ctrl';
import { authRules } from './authRules';

const auth = express.Router();

auth.post('/register/social', authRules['forLocalRegister'], createAccount);
auth.post('/login/social', loginSocailAccount);
export default auth;
