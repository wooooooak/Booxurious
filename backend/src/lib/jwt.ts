import * as jwt from 'jsonwebtoken';
import { resolve } from 'dns';
import { reject } from '../../node_modules/@types/bluebird';
import * as dotenv from 'dotenv';

dotenv.config();
const secretKey = process.env.SECRET_KEY;

export class Jwt {
  static async generate (payload: any, options?: any): Promise<string> {
    try {
      const token = await jwt.sign(payload, secretKey, {
        expiresIn: '7d',
        issuer: 'coderoad',
        ...options
      });
      return token;
    } catch (error) {
      return error;
    }
  }
}

// export const generate = async (payload: any, options?: any): Promise<string> => {
//   const token = await jwt.sign(payload, secretKey, {
//     expiresIn: '7d',
//     issuer: 'coderoad',
//     ...options
//   });
//   return token;
// };

export const decode = async (token: string): Promise<any> => {
  const decoded = jwt.verify(token, secretKey);
  return decoded;
};
