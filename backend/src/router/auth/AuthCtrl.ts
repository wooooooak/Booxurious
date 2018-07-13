import * as express from 'express';
import { validationResult } from 'express-validator/check';
import { compareSync } from 'bcrypt';
import { matchedData } from 'express-validator/filter';
import User, { UserAddModel, UserModel, hash } from '../../db/model/User';
import { Jwt } from '../../lib/jwt';

class AuthCtrl {
  constructor () {
    // this.isPasswordMatch = this.isPasswordMatch.bind(this);
  }

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

  // isPasswordMatch (plainPassword: string, hashedPasswod: string) {
  //   const result: boolean = compareSync(plainPassword, hashedPasswod);
  //   return result;
  // }

  async loginLocalAccount (req: express.Request, res: express.Response): Promise<any> {
    try {
      const token = await Jwt.generate({ foo: 'bar' });
      console.log('token is ', token);
      const { email, password } = req.body;
      const user: UserModel = await User.findOne({ where: { email: email } });
      if (!user) {
        return res.json({ message: `${email}에 해당하는 계정이 없습니다 ㅠ` });
      }
      const result: boolean = compareSync(password, user.password);
      if (result) {
        return res.status(200).json(user);
      } else {
        return res.status(200).json({ message: 'password miss match' });
      }
    } catch (error) {
      return res.json(error);
    }
  }
  // 이건 잘 작동하는데...
  // loginLocalAccount = async (
  //   req: express.Request,
  //   res: express.Response
  // ): Promise<any> => {
  //   try {
  //     const { email, password } = req.body;
  //     const user: UserModel = await User.findOne({ where: { email: email } });
  //     if (!user) {
  //       return res.json({ message: `${email}에 해당하는 계정이 없습니다 ㅠ` });
  //     }
  //     const result = await this.isPasswordMatch(password, user.password);
  //     console.log(result);
  //     if (result) {
  //       return res.status(200).json(user);
  //     } else {
  //       return res.status(200).json({ message: 'password miss match' });
  //     }
  //   } catch (error) {
  //     return res.json(error);
  //   }
  // };
}

export default AuthCtrl;
