import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import router from './router';

export class Server {
  private app: express.Application;

  constructor() {
    this.app = express();
    this.middleware();
    this.setRoute();
  }

  private middleware(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(cors());
  }

  private setRoute(): void {
    this.app.use('/', router);
  }

  get getApp(): express.Application {
    return this.app;
  }
}
