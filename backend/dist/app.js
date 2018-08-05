'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _awsServerlessExpress = require('aws-serverless-express');

var _awsServerlessExpress2 = _interopRequireDefault(_awsServerlessExpress);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _db = require('./db');

var _sync = require('./db/sync');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
app.use((0, _cors2.default)());
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));

_db.sequelize.authenticate().then(function () {
  (0, _sync.sync)();
});

app.get('/test', function (req, res) {
  res.send('ahaahahaha');
});

if (process.env.APP_ENV === 'local') {
  app.listen(8080, function () {
    console.log('Express server listening on port 8080');
  });
}

var server = _awsServerlessExpress2.default.createServer(app);

exports.handler = function (event, context) {
  return _awsServerlessExpress2.default.proxy(server, event, context);
};