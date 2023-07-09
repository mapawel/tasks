import { Router, Request, Response, NextFunction } from 'express';
import { ExtendedRequest } from '../../app-interfaces/extended-req.interface';
import { TasksRoutes } from '../../tasks/routes/tasks-routes.enum';
import { authMiddleware } from '../../auth/middlewares/auth-middleware';

export class TasksRouter {
  constructor(private readonly router: Router) {}

  public initTasksRoutes(): void {
    this.router.get(
      TasksRoutes.TASKS,
      authMiddleware,
      (req: ExtendedRequest, res: Response) => {
        const { query } = req;
        res.send(
          `Here will be tasks list matching query: ${JSON.stringify(query)}`
        );
      }
    );

    this.router.get(
      `${TasksRoutes.TASKS}${TasksRoutes.ID}`,
      (req: Request, res: Response) => {
        const { id } = req.params;
        res.send(`Here will be a task with id: ${id}`);
      }
    );

    this.router.post(TasksRoutes.TASKS, (req: Request, res: Response) => {
      res.send('Here will be a response with a new task just created');
    });

    this.router.patch(
      `${TasksRoutes.TASKS}${TasksRoutes.ID}`,
      (req: Request, res: Response) => {
        res.send('Here will response with a task just updated');
      }
    );

    this.router.delete(
      `${TasksRoutes.TASKS}${TasksRoutes.ID}`,
      (req: Request, res: Response) => {
        res.send('Here will response with result of task deletion');
      }
    );
  }
}
