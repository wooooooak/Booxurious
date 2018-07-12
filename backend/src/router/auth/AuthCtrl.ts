import * as express from 'express';
import { validationResult } from 'express-validator/check';
const { matchedData, sanitize } = require('express-validator/filter');
import User, { UserAddModel, UserModel } from '../../db/model/User';

class AuthCtrl {
  async createLocalAccount (req: express.Request, res: express.Response): Promise<any> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.mapped() });
      }
      const matchedUser: UserModel = matchedData(req) as UserModel;
      const user = await User.create(matchedUser);
      return res.json(user);
    } catch (error) {
      return res.json({ message: error.name });
    }
  }
}

export default AuthCtrl;
