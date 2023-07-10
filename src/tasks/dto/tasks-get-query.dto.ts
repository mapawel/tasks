import { Transform } from "class-transformer";
import { IsEnum, IsIn, IsNumber, IsOptional, IsString } from "class-validator";
import { TaskStatus } from "../../tasks/status/task-status.enum";

export class TasksGetQueryDTO {
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsOptional()
  skip = 0;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsOptional()
  take = 50;

  @IsIn(["DESC", "ASC"])
  @IsOptional()
  order = "DESC";

  @IsIn(["status", "title", "createdAt"])
  @IsOptional()
  orderBy = "createdAt";

  @IsEnum(TaskStatus)
  @IsOptional()
  status: TaskStatus;

  @IsString()
  @IsOptional()
  title: string;
}
