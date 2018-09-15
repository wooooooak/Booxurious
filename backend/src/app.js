import express from 'express';
import awsServerlessExpress from 'aws-serverless-express';
import awsServerlessExpressMiddleware from 'aws-serverless-express/middleware';
import bodyParser from 'body-parser';
import cors from 'cors';

import api from './router';
import { sequelize } from './db';
import { sync } from './db/sync';

const app = express();
app.use(cors());
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: true }));
api.use(awsServerlessExpressMiddleware.eventContext());

sequelize.authenticate().then(() => {
  sync();
});

app.use('/', api);
if (process.env.NODE_ENV === 'development') {
  app.listen(8080, () => {
    console.log(`Express server listening on port 8080`);
  });
}
const server = awsServerlessExpress.createServer(app);

exports.handler = (event, context) => awsServerlessExpress.proxy(server, event, context);
