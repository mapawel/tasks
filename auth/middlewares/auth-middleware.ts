import { IUserPayload } from '../../auth/interfaces/user-payload.interface';
import { JwtService } from '../../auth/service/jwt.service';
import { UnauthorizedException } from '../../exceptions/unauthorized.exception';
import { NextFunction, Response } from 'express';
import { ExtendedRequest } from '../../app-interfaces/extended-req.interface';
import { TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken';
import { redisClient } from '../../data-source/redis.data-source';

export const createAuthMiddleware =
  ({ openPath }: { openPath: string }) =>
  async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    try {
      if (req.path === openPath) return next();

      const Authorization: string | undefined = req.get('Authorization');
      if (!Authorization)
        return next(new UnauthorizedException('No Authorization header'));

      const token: string = Authorization.split(' ')[1];
      if (!token) return next(new UnauthorizedException('No token provided'));

      const isBlackListed = await redisClient.get(token);
      if (isBlackListed)
        return next(new UnauthorizedException('Token revoked'));

      const decoded: IUserPayload = await JwtService.verify(token);
      if (!decoded) return new UnauthorizedException('Invalid token');

      req.userId = decoded.userId;
      next();
    } catch (err) {
      if (err instanceof TokenExpiredError)
        return next(new UnauthorizedException('Token expired'));
      if (err instanceof JsonWebTokenError)
        return next(new UnauthorizedException('Invalid token'));
      next(err);
    }
  };
