'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decodeToken = exports.generate = undefined;

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import dotenv from 'dotenv';

// dotenv.config();
// lambda에서 process.env.SECRET_KEY를 읽어오지 못해 임의로 secret키 하드코딩.. 배포할 땐 꼭 변경하자!
var secretKey = 'FEhguHXMOvCErayV2Huezy';
// const secretKey = process.env.SECRET_KEY;
console.log('시크릿 키 : ' + 'FEhguHXMOvCErayV2Huezy');

var generate = exports.generate = async function generate(payload) {
  try {
    var token = await _jsonwebtoken2.default.sign(payload, secretKey, {
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

var decodeToken = exports.decodeToken = async function decodeToken(token) {
  var decoded = _jsonwebtoken2.default.verify(token, secretKey);
  return decoded;
};