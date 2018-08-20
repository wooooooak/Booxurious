import jwt from 'jsonwebtoken';
import { dumper } from 'dumper';

import { jwtSecretKey } from '../secret.js';

export const generate = async (payload) => {
  try {
    const token = await jwt.sign(payload, jwtSecretKey, {
      expiresIn: '7d',
      issuer: 'elecoder'
    });
    return token;
  } catch (error) {
    console.log('error', error);
    return error;
  }
};

export const decodeToken = async (token) => {
  const decoded = await jwt.verify(token, jwtSecretKey);
  return decoded;
};
