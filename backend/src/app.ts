import * as express from 'express';

export class Server {
  public app: express.Application;

  constructor() {
    this.app = express();

    this.app.get('/', (req: express.Request, res: express.Response) => {
      res.send('hello world');
    });
    this.app.get('/test', (req: express.Request, res: express.Response) => {
      res.send('hello test!!!!test!!!!');
    });
  }
}
