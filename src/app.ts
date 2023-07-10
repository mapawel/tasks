import express, { Application, Router, json } from "express";
import { createServer, Server } from "http";
import { config } from "dotenv-safe";
import { TasksRouter } from "./tasks/router/tasks.router";
import { AuthRouter } from "./auth/router/auth.router";
import { middleware404 } from "./exceptions/middlewares/404.middleware";
import { appExceptionMiddleware } from "./exceptions/middlewares/app-exception.middleware";
import { mySQLDataSource } from "./data-source/mySQL.data-source";
import { redisClient } from "./data-source/redis.data-source";
import { createAuthMiddleware } from "./auth/middlewares/auth-middleware";
import { AuthRoutes } from "./auth/routes/auth-routes.enum";

import { onlyForDevelopmentGetOrCreateTestUser } from "./DEVELOPMENT-ONLY/get-or-create-test-user";

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

    this.app.use(
      createAuthMiddleware({
        openPath: `${AuthRoutes.AUTH}${AuthRoutes.LOGIN}`,
      })
    );
    this.app.use(this.router);

    this.app.use(middleware404);
    this.app.use(appExceptionMiddleware);
  }

  public async appInit(): Promise<void> {
    try {
      await mySQLDataSource.initialize();
      console.log("Connection to local MySQL DB has been initialized!");

      await redisClient.connect();
      console.log("Redis client has been initialized!");

      this.server.listen(this.port, () => {
        console.log(`Server is running on port ${this.port}`);
      });
    } catch (err) {
      console.error("Error during app initialization:", err);
    }
  }
}

(async function main() {
  const app = new App(8000);
  await app.appInit();
  console.log(
    await onlyForDevelopmentGetOrCreateTestUser(
      "testUser2@mail.com",
      "notHashedPassForDevelopmentOnly"
    )
  );
})();
