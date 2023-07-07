import { Request, Response, NextFunction } from 'express';
import { HttpException } from '../../exceptions/http.exception';
import { BadRequestException } from '../../exceptions/bad-request.exception';

export const appExceptionMiddleware = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(' --> APP ERROR: ', error, ' <--');

  if (error instanceof BadRequestException)
    return res.status(error.code).json({
      message: error.message,
      validationInfo: error.payload.validationInfo,
    });

  return res.status(error.code).json(error.message);
};
