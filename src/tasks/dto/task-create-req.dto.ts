import { Transform } from "class-transformer";
import { IsDate, IsString, Length } from "class-validator";

export class TaskCreateReqDTO {
  @IsString()
  @Length(3, 30)
  title: string;

  @IsString()
  @Length(3, 30)
  description: string;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  startTime: Date;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  deadline: Date;
}
