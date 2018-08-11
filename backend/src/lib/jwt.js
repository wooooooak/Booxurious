import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';

import { jwtSecretKey } from '../secret.js';
// dotenv.config();
// lambda에서 process.env.SECRET_KEY를 읽어오지 못해 임의로 secret키 하드코딩.. 배포할 땐 꼭 변경하자!
// const secretKey = 'FEhguHXMOvCErayV2Huezy';
// const secretKey = process.env.SECRET_KEY;
console.log('시크릿 키 : ' + jwtSecretKey);

export const generate = async (payload) => {
  try {
    const token = await jwt.sign(payload, jwtSecretKey, {
      expiresIn: '7d',
      issuer: 'elecoder'
    });
    console.log('token', token);
    return token;
  } catch (error) {
    console.log('error', error);
    return error;
  }
};

export const decodeToken = async (token) => {
  const decoded = jwt.verify(token, jwtSecretKey);
  return decoded;
};
