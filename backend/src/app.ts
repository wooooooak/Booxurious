import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import router from './router';
import { sequelize } from './db';
import { sync } from './db/sync';
import * as dotenv from 'dotenv';
import * as awsServerlessExpressMiddleware from 'aws-serverless-express/middleware';

export class Server {
  private app: express.Application;
  // private database;
  constructor () {
    dotenv.config();
    this.app = express();
    this.app.get('/test', (req: express.Request, res: express.Response) => {
      // res.sendFile(path.join(__dirname, '/build/index.html'));
      res.json({ a: __dirname });
    });
    this.middleware();
    this.setRoute();
  }

  private async middleware (): Promise<void> {
    this.app.use(awsServerlessExpressMiddleware.eventContext());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(express.static(path.join(__dirname + 'public')));
    this.app.use(cors());
    sequelize.authenticate().then(() => {
      sync();
    });
  }

  private setRoute (): void {
    this.app.use('/', router);
  }

  get getApp (): express.Application {
    return this.app;
  }
}
