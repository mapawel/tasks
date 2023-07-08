import { ValidationError, validate } from 'class-validator';
import { ClassType } from 'class-transformer-validator';
import { plainToInstance } from 'class-transformer';
import { BadRequestException } from '../../exceptions/bad-request.exception';
import { NextFunction, Request, Response } from 'express';

export class ValidationMiddlewares {
  static getBodyValidation<T extends object>(targetClass: ClassType<T>) {
    return async (req: Request, res: Response, next: NextFunction) => {
      const validated = plainToInstance(targetClass, req.body);

      const errors: ValidationError[] = await validate(validated, {
        whitelist: true,
        forbidNonWhitelisted: true,
      });
      if (errors.length > 0) {
        next(new BadRequestException({ errors }));
      }
      next();
    };
  }
}
