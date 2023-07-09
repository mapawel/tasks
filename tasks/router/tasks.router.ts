import { Router, Request, Response, NextFunction } from 'express';
import { ExtendedRequest } from '../../app-interfaces/extended-req.interface';
import { TasksRoutes } from '../../tasks/routes/tasks-routes.enum';
import { TasksService } from '../../tasks/service/tesks.service';

export class TasksRouter {
  constructor(
    private readonly router: Router,
    private readonly tasksService = new TasksService()
  ) {}

  public initTasksRoutes(): void {
    this.router.get(
      TasksRoutes.TASKS,
      (req: ExtendedRequest, res: Response, next: NextFunction) =>
        this.tasksService.getTasks(req, res, next)
    );

    this.router.get(
      `${TasksRoutes.TASKS}${TasksRoutes.ID}`,
      (req: ExtendedRequest, res: Response, next: NextFunction) =>
        this.tasksService.getTaskById(req, res, next)
    );

    this.router.post(
      TasksRoutes.TASKS,
      (req: ExtendedRequest, res: Response, next: NextFunction) =>
        this.tasksService.createTask(req, res, next)
    );

    this.router.patch(
      `${TasksRoutes.TASKS}${TasksRoutes.ID}`,
      (req: ExtendedRequest, res: Response, next: NextFunction) =>
        this.tasksService.updateTask(req, res, next)
    );

    this.router.delete(
      `${TasksRoutes.TASKS}${TasksRoutes.ID}`,
      (req: ExtendedRequest, res: Response, next: NextFunction) =>
        this.tasksService.deleteTask(req, res, next)
    );
  }
}
