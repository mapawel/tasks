import { Router, Request, Response, NextFunction } from 'express';
import { AuthRoutes } from '../../auth/routes/auth-routes.enum';
import { AuthService } from '../../auth/service/auth.service';
import { UserLoginReqDTO } from '../../auth/dto/user-login-req.dto';
import { ValidationMiddlewares } from '../../validation/middleware/validation-middlewares';
import { ExtendedRequest } from '../../app-interfaces/extended-req.interface';
import { mySQLDataSource } from '../../data-source/mySQL.data-source';
import { User } from '../../users/entity/user.entity';

export class AuthRouter {
  constructor(
    private readonly router: Router,
    private readonly authService = new AuthService(
      mySQLDataSource.getRepository(User)
    ),
    private readonly getbodyValidation = ValidationMiddlewares.getBodyValidation
  ) {}

  public initTasksRoutes(): void {
    this.router.post(
      `${AuthRoutes.AUTH}${AuthRoutes.LOGIN}`,
      this.getbodyValidation<UserLoginReqDTO>(UserLoginReqDTO),
      (req: Request, res: Response, next: NextFunction) =>
        this.authService.login(req, res, next)
    );

    this.router.get(
      `${AuthRoutes.AUTH}${AuthRoutes.LOGOUT}`,
      (req: ExtendedRequest, res: Response, next: NextFunction) =>
        this.authService.logout(req, res, next)
    );

    this.router.get(
      `${AuthRoutes.AUTH}${AuthRoutes.ME}`,
      (req: ExtendedRequest, res: Response, next: NextFunction) =>
        this.authService.getMe(req, res, next)
    );
  }
}
