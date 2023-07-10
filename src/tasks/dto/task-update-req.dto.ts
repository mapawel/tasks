import { Exclude, Transform } from "class-transformer";
import { IsDate, IsEnum, IsOptional, IsString, Length } from "class-validator";
import { TaskStatus } from "../../tasks/status/task-status.enum";

export class TaskUpdateReqDTO {
  @IsString()
  @Length(3, 30)
  @IsOptional()
  title: string;

  @IsString()
  @Length(3, 30)
  @IsOptional()
  description: string;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  @IsOptional()
  startTime: Date;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  @IsOptional()
  deadline: Date;

  @IsEnum(TaskStatus)
  @IsOptional()
  status: TaskStatus;
}
