import { check } from 'express-validator/check';
import User from '../../db/model/User';

export const authRules = {
  forLocalRegister: [
    check('email').isEmail().withMessage('Invalid email format').trim().exists(),
    check('email')
      .isEmail()
      .custom(async (email, { req }) => {
        const user = await User.findOne({ where: { email: email } });
        return user ? false : true;
      })
      .withMessage('duple'),
    // check('password').isLength({ min: 8 }).withMessage('Invalid password'),
    // check('confirmPassword')
    //   .custom((confirmPassword, { req }) => req.body.password === confirmPassword)
    //   .withMessage('Passwords are different'),
    check('username').isLength({ max: 20 }).withMessage('Too long username')
  ],
  forLocalLogin: []
};
