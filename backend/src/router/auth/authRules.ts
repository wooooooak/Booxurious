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
      .withMessage('duple email'),
    check('username').isLength({ max: 20 }).withMessage('Too long username')
    // check('username')
    //   .custom(async (username, { req }) => {
    //     console.log(username);
    //     const user = await User.findOne({ where: { username } });
    //     console.log(user);
    //     return user ? false : true;
    //   })
    //   .withMessage('duple username')
  ],
  forLocalLogin: []
};
