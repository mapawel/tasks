import { NextFunction, Request, Response } from 'express';
import { User } from '../../users/entity/user.entity';
import { mySQLDataSource } from '../../data-source/mySQL.data-source';
import { UnauthorizedException } from '../../exceptions/unauthorized.exception';
import { JwtService } from './jwt.service';
import { ExtendedRequest } from 'app-interfaces/extended-req.interface';
import { NotFoundException } from '../../exceptions/not-found.exception';
import { userDtoMapper } from '../../users/dto/user-dto.mapper';
import { UserDTO } from 'users/dto/user.dto';

export class AuthService {
  private readonly userRepoitory = mySQLDataSource.getRepository(User);

  public async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<{ token: string }> | void> {
    try {
      const { email, password } = req.body;
      const user = await this.userRepoitory.findOne({
        where: { email, password },
      });

      if (!user) throw new UnauthorizedException('Invalid credentials');

      const token = await JwtService.sign({ userId: user.id });

      res.json({ token });
    } catch (error) {
      next(error);
    }
  }

  public async getMe(
    req: ExtendedRequest,
    res: Response,
    next: NextFunction
  ): Promise<Response<UserDTO> | void> {
    try {
      const user = await this.userRepoitory.findOne({
        where: { id: req.userId },
      });

      if (!user)
        throw new UnauthorizedException('Invalid request, cannon fetch user');

      res.json(userDtoMapper(user));
    } catch (error) {
      next(error);
    }
  }

  public async logout(
    req: ExtendedRequest,
    res: Response,
    next: NextFunction
  ): Promise<Response<{ message: string }> | void> {
    try {
      const user = await this.userRepoitory.findOne({
        where: { id: req.userId },
      });

      if (!user)
        throw new UnauthorizedException('Invalid request, cannon logout');

      // inplementation of logout logic

      res.json({ message: 'Logout successfull' });
    } catch (error) {
      next(error);
    }
  }
}
