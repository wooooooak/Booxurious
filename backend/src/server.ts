import { Server } from './app';
import * as express from 'express';
import * as awsServerlessExpress from 'aws-serverless-express';

const port: number = 3000;
// const port: number = process.env.PORT || 3000;
const app: express.Application = new Server().app;
app.set('port', port);

if (process.env.APP_ENV === 'local') {
  app.listen(app.get('port'), () => {
    console.log(`Express server listening on port ${app.get('port')}`);
  });
}
const server = awsServerlessExpress.createServer(app);
exports.handler = (event, context) =>
  awsServerlessExpress.proxy(server, event, context);
// export const handler = serverless(app);
