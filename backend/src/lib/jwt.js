import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';

// dotenv.config();
// lambda에서 process.env.SECRET_KEY를 읽어오지 못해 임의로 secret키 하드코딩.. 배포할 땐 꼭 변경하자!
const secretKey = 'FEhguHXMOvCErayV2Huezy';
// const secretKey = process.env.SECRET_KEY;
console.log('시크릿 키 : ' + 'FEhguHXMOvCErayV2Huezy');

const generate = async (payload, options?) => {
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
};

export const decodeToken = async (token) => {
  const decoded = jwt.verify(token, secretKey);
  return decoded;
};
