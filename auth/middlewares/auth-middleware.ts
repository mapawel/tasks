import { IUserPayload } from '../../auth/interfaces/user-payload.interface';
import { JwtService } from '../../auth/service/jwt.service';
import { UnauthorizedException } from '../../exceptions/unauthorized.exception';
import { NextFunction, Response } from 'express';
import { ExtendedRequest } from '../../app-interfaces/extended-req.interface';
import { TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken';

export const authMiddleware = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const Authorization: string | undefined = req.get('Authorization');
    if (!Authorization)
      return next(new UnauthorizedException('No Authorization header'));

    const token: string = Authorization.split(' ')[1];
    if (!token) return next(new UnauthorizedException('No token provided'));

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
