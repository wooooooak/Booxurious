import { check } from 'express-validator/check';

export const authRules = {
  forLocalRegister: [
    check('email').isEmail().withMessage('Invalid email format').trim().exists(),
    check('password').isLength({ min: 8 }).withMessage('Invalid password'),
    check('confirmPassword')
      .custom((confirmPassword, { req }) => req.body.password === confirmPassword)
      .withMessage('Passwords are different'),
    check('username').isLength({ max: 20 }).withMessage('Too long username')
  ],
  forLocalLogin: []
};
