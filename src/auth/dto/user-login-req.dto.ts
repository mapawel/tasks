import { IsEmail, IsString } from "class-validator";

export class UserLoginReqDTO {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}
