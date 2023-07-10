import { TaskStatus } from "tasks/status/task-status.enum";
import { UserResDTO } from "users/dto/user-res.dto";

export interface TaskResDTO {
  id: number;
  title: string;
  description: string;
  startTime: Date;
  deadline: Date;
  status: TaskStatus;
  user: UserResDTO;
}
