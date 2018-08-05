'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _auth = require('./auth.ctrl');

var _authRules = require('./authRules');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var auth = _express2.default.Router();

auth.post('/register/social', _authRules.authRules['forLocalRegister'], _auth.createAccount);
// auth.post('/login/local', loginLocalAccount);
auth.get('/test', _auth.test);
auth.post('/login/social', _auth.loginSocailAccount);
exports.default = auth;