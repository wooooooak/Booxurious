import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();
// lambda에서 process.env.SECRET_KEY를 읽어오지 못해 임의로 secret키 하드코딩.. 배포할 땐 꼭 변경하자!
const secretKey = 'FEhguHXMOvCErayV2Huezy';
// const secretKey = process.env.SECRET_KEY;
console.log('시크릿 키 : ' + 'FEhguHXMOvCErayV2Huezy');

export default class Jwt {
  static async generate (payload: any, options?: any): Promise<string> {
    try {
      const token = await jwt.sign(payload, secretKey, {
        expiresIn: '7d',
        issuer: 'elecoder',
        ...options
      });
      return token;
    } catch (error) {
      return error;
    }
  }
}
export const decodeToken = async (token: string): Promise<any> => {
  const decoded = jwt.verify(token, secretKey);
  return decoded;
};
