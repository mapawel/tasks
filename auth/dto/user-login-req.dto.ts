import { IsEmail, IsString } from 'class-validator';
import { plainToClass } from 'class-transformer';

export class UserLoginReqDTO {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}
