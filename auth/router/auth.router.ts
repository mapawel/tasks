import { Router, Request, Response } from 'express';
import { AuthRoutes } from '../../auth/routes/auth-routes.enum';

export class AuthRouter {
  constructor(private readonly router: Router) {}

  public initTasksRoutes(): void {
    this.router.post(
      `${AuthRoutes.AUTH}${AuthRoutes.LOGIN}`,
      (req: Request, res: Response) => {
        const { email } = req.body;
        res.send(
          `Here will be a response with a token for user with email: ${email}`
        );
      }
    );

    this.router.get(
      `${AuthRoutes.AUTH}${AuthRoutes.LOGOUT}`,
      (req: Request, res: Response) => {
        res.send('Here will be a response with a message about logout');
      }
    );

    this.router.get(
      `${AuthRoutes.AUTH}${AuthRoutes.ME}`,
      (req: Request, res: Response) => {
        res.send('Here will be a response with a user info');
      }
    );
  }
}
