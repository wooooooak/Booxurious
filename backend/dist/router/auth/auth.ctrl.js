'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.test = exports.loginSocailAccount = exports.createAccount = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _check = require('express-validator/check');

var _filter = require('express-validator/filter');

var _User = require('../../db/model/User');

var _User2 = _interopRequireDefault(_User);

var _jwt = require('../../lib/jwt');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createAccount = exports.createAccount = async function createAccount(req, res) {
  try {
    var errors = (0, _check.validationResult)(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() });
    }

    var _matchedData = (0, _filter.matchedData)(req),
        username = _matchedData.username,
        email = _matchedData.email,
        socialProvider = _matchedData.socialProvider;

    var user = await _User2.default.create({
      username: username,
      email: email,
      socialProvider: socialProvider
    });
    var token = await (0, _jwt.generate)({
      email: email,
      username: username,
      socialProvider: socialProvider
    });
    return res.json({ user: user, token: token });
  } catch (error) {
    console.log('err', error);
    return res.json({ message: error.name });
  }
};
// import  bcrypt from 'bcryptjs';
var loginSocailAccount = exports.loginSocailAccount = async function loginSocailAccount(req, res) {
  try {
    var _req$body = req.body,
        email = _req$body.email,
        socialProvider = _req$body.socialProvider;

    var user = await _User2.default.findOne({ where: { email: email } });
    var token = '';
    if (user) {
      token = await Jwt.generate({
        socialProvider: socialProvider,
        email: email,
        username: user.username
      });
      res.json({ user: user, code: 1, token: token });
    } else {
      res.json({ socialProvider: socialProvider, email: email, code: 2 });
    }
  } catch (err) {
    console.log('eeerrrrr' + err);
  }
};

var test = exports.test = function test(req, res) {
  res.send('test success');
};