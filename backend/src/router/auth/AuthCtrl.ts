import * as express from 'express';
import { validationResult } from 'express-validator/check';
import * as bcrypt from 'bcryptjs';
import { matchedData } from 'express-validator/filter';
import User, { UserAddModel, UserModel, hash } from '../../db/model/User';
import Jwt from '../../lib/jwt';

class AuthCtrl {
  async createLocalAccount (req: express.Request, res: express.Response): Promise<any> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.mapped() });
      }
      const { username, email, password }: UserModel = matchedData(req) as UserModel;
      const hashedPassword: string = hash(password);
      const user: UserModel = await User.create({
        username,
        email,
        password: hashedPassword
      });
      return res.json(user);
    } catch (error) {
      return res.json({ message: error.name });
    }
  }

  async loginLocalAccount (req: express.Request, res: express.Response): Promise<any> {
    try {
      const token = await Jwt.generate({ foo: 'bar' });
      const { email, password } = req.body;
      const user: UserModel = await User.findOne({ where: { email: email } });
      if (!user) {
        return res.json({ message: `${email}에 해당하는 계정이 없습니다 ㅠ` });
      }
      const result: boolean = bcrypt.compareSync(password, user.password);
      if (result) {
        return res.status(200).json({ user, token: token });
      } else {
        return res.status(200).json({ message: 'password miss match' });
      }
    } catch (error) {
      return res.json(error);
    }
  }

  test (req: express.Request, res: express.Response) {
    return res.send('sdfasdfasdf');
  }
}

export default AuthCtrl;
