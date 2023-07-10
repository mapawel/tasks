import { Task } from "tasks/entity/task.entity";
import { userResDtoMapper } from "../../users/dto/user-res-dto.mapper";
import { TaskResDTO } from "./task-res.dto";

export const taskResDtoMapper = (task: Task): TaskResDTO => ({
  id: task.id,
  title: task.title,
  description: task.description,
  startTime: task.startTime,
  deadline: task.deadline,
  status: task.status,
  user: userResDtoMapper(task.user),
});
