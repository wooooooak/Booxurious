import express from 'express';
import awsServerlessExpress from 'aws-serverless-express';
import bodyParser from 'body-parser';
import cors from 'cors';

// 여기가 문제인듯
import api from './router';
import { sequelize } from './db';
import { sync } from './db/sync';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// sequelize.authenticate().then(() => {
//   sync();
// });

app.use('/', api);

if (process.env.APP_ENV === 'local') {
  app.listen(8080, () => {
    console.log(`Express server listening on port 8080`);
  });
}

const server = awsServerlessExpress.createServer(app);

exports.handler = (event, context) => awsServerlessExpress.proxy(server, event, context);
