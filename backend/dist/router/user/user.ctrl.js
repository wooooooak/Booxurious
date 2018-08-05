'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchUserData = undefined;

var _User = require('../../db/model/User');

var _User2 = _interopRequireDefault(_User);

var _jwt = require('../../lib/jwt');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fetchUserData = exports.fetchUserData = async function fetchUserData(req, res) {
  var token = req.headers['auth-header'];
  var decodedToken = await (0, _jwt.decodeToken)(token);
  console.log(decodedToken);
  var email = decodedToken.email,
      username = decodedToken.username,
      socialProvider = decodedToken.socialProvider;

  res.json({ email: email, username: username, socialProvider: socialProvider });
};