import { Router, Request, Response, NextFunction } from "express";
import { ExtendedRequest } from "../../app-interfaces/extended-req.interface";
import { TasksRoutes } from "../../tasks/routes/tasks-routes.enum";
import { TasksService } from "../../tasks/service/tesks.service";
import { ValidationMiddlewares } from "../../validation/middleware/validation-middlewares";
import { TasksGetQueryDTO } from "../../tasks/dto/tasks-get-query.dto";
import { TaskCreateReqDTO } from "../../tasks/dto/task-create-req.dto";
import { TaskReqParamDTO } from "../../tasks/dto/task-req-param.dto";
import { TaskUpdateReqDTO } from "../../tasks/dto/task-update-req.dto";

export class TasksRouter {
  constructor(
    private readonly router: Router,
    private readonly tasksService = new TasksService(),
    private readonly getQueryValidation = ValidationMiddlewares.getQueryValidation,
    private readonly getBodyValidation = ValidationMiddlewares.getBodyValidation,
    private readonly getParamValidation = ValidationMiddlewares.getParamValidation
  ) {}

  public initTasksRoutes(): void {
    this.router.get(
      TasksRoutes.TASKS,
      this.getQueryValidation<TasksGetQueryDTO>(TasksGetQueryDTO),
      (req: ExtendedRequest, res: Response, next: NextFunction) =>
        this.tasksService.getTasks(req, res, next)
    );

    this.router.get(
      `${TasksRoutes.TASKS}${TasksRoutes.ID}`,
      this.getParamValidation<TaskReqParamDTO>(TaskReqParamDTO),
      (req: ExtendedRequest, res: Response, next: NextFunction) =>
        this.tasksService.getTaskById(req, res, next)
    );

    this.router.post(
      TasksRoutes.TASKS,
      this.getBodyValidation<TaskCreateReqDTO>(TaskCreateReqDTO),
      (req: ExtendedRequest, res: Response, next: NextFunction) =>
        this.tasksService.createTask(req, res, next)
    );

    this.router.patch(
      `${TasksRoutes.TASKS}${TasksRoutes.ID}`,
      this.getBodyValidation<TaskUpdateReqDTO>(TaskUpdateReqDTO),
      this.getParamValidation<TaskReqParamDTO>(TaskReqParamDTO),
      (req: ExtendedRequest, res: Response, next: NextFunction) =>
        this.tasksService.updateTask(req, res, next)
    );

    this.router.delete(
      `${TasksRoutes.TASKS}${TasksRoutes.ID}`,
      this.getParamValidation<TaskReqParamDTO>(TaskReqParamDTO),
      (req: ExtendedRequest, res: Response, next: NextFunction) =>
        this.tasksService.deleteTask(req, res, next)
    );
  }
}
