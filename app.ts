import express, { Application, Router, json } from 'express';
import { createServer, Server } from 'http';
import { config } from 'dotenv-safe';
import { TasksRouter } from './tasks/router/tasks.router';
import { AuthRouter } from './auth/router/auth.router';
import { middleware404 } from './exceptions/middlewares/404.middleware';
import { appExceptionMiddleware } from './exceptions/middlewares/app-exception.middleware';

config();

class App {
  private readonly port: number;
  private readonly app: Application;
  private readonly server: Server;
  private readonly router: Router;
  private readonly tasksRouter: TasksRouter;
  private readonly authRouter: AuthRouter;

  constructor(port: number) {
    this.port = Number(process.env.PORT) || port;
    this.app = express();
    this.server = createServer(this.app);
    this.router = express.Router();
    this.tasksRouter = new TasksRouter(this.router);
    this.authRouter = new AuthRouter(this.router);

    this.tasksRouter.initTasksRoutes();
    this.authRouter.initTasksRoutes();

    this.app.use(json());
    this.app.use(this.router);

    this.app.use(middleware404);
    this.app.use(appExceptionMiddleware);
  }

  public appInit(): void {
    this.server.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

const app = new App(8000);
app.appInit();
