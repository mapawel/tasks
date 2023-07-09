import { Response, NextFunction } from 'express';
import { ExtendedRequest } from '../../app-interfaces/extended-req.interface';
import { TaskResDTO } from '../../tasks/dto/task-res.dto';
import { mySQLDataSource } from '../../data-source/mySQL.data-source';
import { Task } from '../../tasks/entity/task.entity';
import { taskResDtoMapper } from '../../tasks/dto/task-res-dto.mapper';
import { NotFoundException } from '../../exceptions/not-found.exception';
import { ForbiddenException } from '../../exceptions/forbidden.exception';
import { TaskStatus } from '../../tasks/status/task-status.enum';

export class TasksService {
  private readonly taskRepoitory = mySQLDataSource.getRepository(Task);

  public async getTasks(
    req: ExtendedRequest,
    res: Response,
    next: NextFunction
  ): Promise<Response<TaskResDTO[]> | void> {
    try {
      const { query } = req;

      console.log('query ----> ', query); // dodać walidację

      const tasks: Task[] = await this.taskRepoitory.find({
        where: query,
        relations: ['user'],
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
      const { id } = req.params;

      const task: Task | null = await this.taskRepoitory.findOne({
        where: { id: +id }, // zmienić gdy validacja params i obiekt z translation: true
        relations: ['user'],
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
      const { body } = req; //dodać walidację

      const task: Task = await this.taskRepoitory.save({
        ...body,
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
      const { id } = req.params;
      const { body } = req; //dodać walidację

      const task: Task | null = await this.taskRepoitory.findOne({
        where: { id: +id }, // zmienić gdy validacja params i obiekt z translation: true
        relations: ['user'],
      });
      if (!task) throw new NotFoundException();

      const updatedTask: Task = await this.taskRepoitory.save({
        ...task,
        ...body,
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
      const { id } = req.params;

      const task: Task | null = await this.taskRepoitory.findOne({
        where: { id: +id }, // zmienić gdy validacja params i obiekt z translation: true
        relations: ['user'],
      });
      if (!task) throw new NotFoundException();
      if (task.user.id !== req.userId)
        throw new ForbiddenException('Not allowed to delete this task');

      await this.taskRepoitory.remove(task);

      res.json(taskResDtoMapper(task));
    } catch (error) {
      next(error);
    }
  }
}
