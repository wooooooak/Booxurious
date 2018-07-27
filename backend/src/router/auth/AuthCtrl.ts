import * as express from 'express';
import { validationResult } from 'express-validator/check';
import * as bcrypt from 'bcryptjs';
import { matchedData } from 'express-validator/filter';
import User, { UserAddModel, UserModel, UserViewModel, hash } from '../../db/model/User';
import Jwt from '../../lib/jwt';

class AuthCtrl {
  async createAccount (req: express.Request, res: express.Response): Promise<any> {
    try {
      const errors = validationResult(req);
      console.log(errors);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.mapped() });
      }
      const { username, email, socialProvider }: UserModel = matchedData(
        req
      ) as UserModel;
      const user: UserModel = await User.create({
        username,
        email,
        socialProvider
      });
      const token = await Jwt.generate({
        email,
        username,
        socialProvider
      });
      return res.json({ user, token: token });
    } catch (error) {
      return res.json({ message: error.name });
    }
  }

  async loginSocailAccount (req: express.Request, res: express.Response): Promise<any> {
    try {
      const { email, socialProvider }: UserModel = req.body;
      const user: UserModel = await User.findOne({ where: { email: email } });
      let token = '';
      if (user) {
        token = await Jwt.generate({
          socialProvider: socialProvider,
          email: email,
          username: user.username
        });
        res.json({ user, code: 1, token: token });
      } else {
        res.json({ socialProvider, email, code: 2 });
      }
    } catch (err) {
      console.log('eeerrrrr' + err);
    }
  }

  async loginLocalAccount (req: express.Request, res: express.Response): Promise<any> {
    try {
      const token = await Jwt.generate({ foo: 'bar' });
      const { email, password } = req.body;
      const rawUser: UserModel = await User.findOne({ where: { email: email } });
      if (!rawUser) {
        return res.json({ message: `${email}에 해당하는 계정이 없습니다 ㅠ` });
      }
      const user: UserViewModel = {
        id: rawUser.id,
        email: rawUser.email
      };
      // const result: boolean = bcrypt.compareSync(password, rawUser.password);
      // if (result) {
      //   return res.status(200).json({ user, token: token });
      // } else {
      //   return res.status(200).json({ message: 'password miss match' });
      // }
    } catch (error) {
      return res.json(error);
    }
  }

  test (req: express.Request, res: express.Response) {
    return res.send('sdfasdfasdf');
  }
}

export default AuthCtrl;
