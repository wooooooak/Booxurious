import express from "express";
import { createAccount, loginSocialAccount } from "./auth.ctrl";
import { authRules } from "./authRules";

const auth = express.Router();

auth.post("/register/social", authRules["forLocalRegister"], createAccount);
auth.post("/login/social", loginSocialAccount);
export default auth;
