'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authRules = undefined;

var _check = require('express-validator/check');

var _User = require('../../db/model/User');

var _User2 = _interopRequireDefault(_User);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var authRules = exports.authRules = {
  forLocalRegister: [(0, _check.check)('email').isEmail().withMessage('Invalid email format').trim().exists(), (0, _check.check)('email').isEmail().custom(async function (email, _ref) {
    var req = _ref.req;

    var user = await _User2.default.findOne({ where: { email: email } });
    return user ? false : true;
  }).withMessage('duple email'), (0, _check.check)('username').isLength({ max: 20 }).withMessage('Too long username'), (0, _check.check)('username').custom(async function (username, _ref2) {
    var req = _ref2.req;

    console.log(username);
    var user = await _User2.default.findOne({ where: { username: username } });
    console.log(user);
    return user ? false : true;
  }).withMessage('duple username'), (0, _check.check)('socialProvider').isString().withMessage('Invalid provider name').trim()],
  forLocalLogin: []
};