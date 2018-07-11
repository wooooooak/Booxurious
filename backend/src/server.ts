import { Server } from './app';
import * as express from 'express';
import * as awsServerlessExpress from 'aws-serverless-express';

const port: number = 3000;
const app: express.Application = new Server().getApp;

app.set('port', port);

// deploy하지 않고 내 로컬 서버에서 테스트 할 경우
if (process.env.APP_ENV === 'local') {
  app.listen(app.get('port'), () => {
    console.log(`Express server listening on port ${app.get('port')}`);
  });
}

const server = awsServerlessExpress.createServer(app);

exports.handler = (event, context) =>
  awsServerlessExpress.proxy(server, event, context);
