import express, { Application, json } from 'express';
import { createServer, Server } from 'http';
import { config } from 'dotenv-safe';

config();

class App {
  private readonly app: Application;
  private readonly server: Server;
  private readonly port: number;

  constructor(port: number) {
    this.port = Number(process.env.PORT) || port;
    this.app = express();
    this.server = createServer(this.app);

    this.app.use(json());
  }

  public appInit(): void {
    this.server.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

const app = new App(8000);
app.appInit();
