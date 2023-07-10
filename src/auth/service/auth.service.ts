import { NextFunction, Request, Response } from 'express';
import { User } from '../../users/entity/user.entity';
import { UnauthorizedException } from '../../exceptions/unauthorized.exception';
import { JwtService } from './jwt.service';
import { ExtendedRequest } from '../../app-interfaces/extended-req.interface';
import { userResDtoMapper } from '../../users/dto/user-res-dto.mapper';
import { UserResDTO } from 'users/dto/user-res.dto';
import { redisClient } from '../../data-source/redis.data-source';
import { Repository } from 'typeorm';

export class AuthService {
  constructor(private readonly userRepository: Repository<User>) {}

  public async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<{ token: string }> | void> {
    try {
      const { email, password } = req.body;
      const user = await this.userRepository.findOne({
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
  ): Promise<Response<UserResDTO> | void> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: req.userId },
      });

      if (!user)
        throw new UnauthorizedException('Invalid request, cannon fetch user');

      res.json(userResDtoMapper(user));
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
      const Authorization: string | undefined = req.get('Authorization');
      if (!Authorization)
        return next(new UnauthorizedException('No Authorization header'));

      const token: string = Authorization.split(' ')[1];
      if (!token) return next(new UnauthorizedException('No token provided'));

      await redisClient.set(token, token);

      res.json({ message: 'Logout successfull' });
    } catch (error) {
      next(error);
    }
  }
}
