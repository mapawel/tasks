import { NextFunction, Request, Response } from 'express';
import { User } from '../../users/entity/user.entity';
import { mySQLDataSource } from '../../data-source/mySQL.data-source';
import { UnauthorizedException } from '../../exceptions/unauthorized.exception';

export class AuthService {
  private readonly userRepoitory = mySQLDataSource.getRepository(User);

  public async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { email, password } = req.body;
      const user = await this.userRepoitory.findOne({
        where: { email, password },
      });

      if (!user) throw new UnauthorizedException();

      res.send('Here will be a response with a token');
    } catch (error) {
      next(error);
    }
  }
}
