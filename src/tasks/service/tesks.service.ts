import { Response, NextFunction } from "express";
import { plainToInstance } from "class-transformer";
import { ExtendedRequest } from "../../app-interfaces/extended-req.interface";
import { TaskResDTO } from "../../tasks/dto/task-res.dto";
import { mySQLDataSource } from "../../data-source/mySQL.data-source";
import { Task } from "../../tasks/entity/task.entity";
import { taskResDtoMapper } from "../../tasks/dto/task-res-dto.mapper";
import { NotFoundException } from "../../exceptions/not-found.exception";
import { ForbiddenException } from "../../exceptions/forbidden.exception";
import { TaskStatus } from "../../tasks/status/task-status.enum";
import { TasksGetQueryDTO } from "../../tasks/dto/tasks-get-query.dto";
import { TaskCreateReqDTO } from "../../tasks/dto/task-create-req.dto";
import { TaskReqParamDTO } from "../../tasks/dto/task-req-param.dto";
import { TaskUpdateReqDTO } from "../../tasks/dto/task-update-req.dto";

export class TasksService {
  private readonly taskRepoitory = mySQLDataSource.getRepository(Task);

  public async getTasks(
    req: ExtendedRequest,
    res: Response,
    next: NextFunction
  ): Promise<Response<TaskResDTO[]> | void> {
    try {
      const { skip, take, order, orderBy, status, title }: TasksGetQueryDTO =
        plainToInstance(TasksGetQueryDTO, req.query);

      const tasks: Task[] = await this.taskRepoitory.find({
        where: { status, title },
        relations: ["user"],
        skip,
        take,
        order: { [orderBy]: order },
      });
      res.json(tasks.map((task) => taskResDtoMapper(task)));
    } catch (error) {
      next(error);
    }
  }

  public async getTaskById(
    req: ExtendedRequest,
    res: Response,
    next: NextFunction
  ): Promise<Response<TaskResDTO> | void> {
    try {
      const { id } = plainToInstance(TaskReqParamDTO, req.params);

      const task: Task | null = await this.taskRepoitory.findOne({
        where: { id },
        relations: ["user"],
      });

      if (!task) throw new NotFoundException();

      res.json(taskResDtoMapper(task));
    } catch (error) {
      next(error);
    }
  }

  public async createTask(
    req: ExtendedRequest,
    res: Response,
    next: NextFunction
  ): Promise<Response<TaskResDTO> | void> {
    try {
      const taskCreateReqDTO = plainToInstance(TaskCreateReqDTO, req.body);

      const task: Task = await this.taskRepoitory.save({
        ...taskCreateReqDTO,
        status: TaskStatus.OPEN,
        user: { id: req.userId },
        createdBy: req.userId,
        createdAt: new Date(),
      });

      res.json(taskResDtoMapper(task));
    } catch (error) {
      next(error);
    }
  }

  public async updateTask(
    req: ExtendedRequest,
    res: Response,
    next: NextFunction
  ): Promise<Response<TaskResDTO> | void> {
    try {
      const { id } = plainToInstance(TaskReqParamDTO, req.params);

      const taskUpdateReqDTO = plainToInstance(TaskUpdateReqDTO, req.body, {
        exposeUnsetFields: true,
      });

      const task: Task | null = await this.taskRepoitory.findOne({
        where: { id },
        relations: ["user"],
      });
      if (!task) throw new NotFoundException();

      const updatedTask: Task = await this.taskRepoitory.save({
        ...task,
        ...taskUpdateReqDTO,
        updatedBy: req.userId,
        updatedAt: new Date(),
      });

      res.json(taskResDtoMapper(updatedTask));
    } catch (error) {
      next(error);
    }
  }

  public async deleteTask(
    req: ExtendedRequest,
    res: Response,
    next: NextFunction
  ): Promise<Response<TaskResDTO> | void> {
    try {
      const { id } = plainToInstance(TaskReqParamDTO, req.params);

      const task: Task | null = await this.taskRepoitory.findOne({
        where: { id },
        relations: ["user"],
      });
      if (!task) throw new NotFoundException();
      if (task.createdBy !== req.userId)
        throw new ForbiddenException("Not allowed to delete this task");

      await this.taskRepoitory.remove(task);

      res.json(taskResDtoMapper(task));
    } catch (error) {
      next(error);
    }
  }
}
