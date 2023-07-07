import { HttpException } from './http.exception';

export class BadRequestException extends HttpException {
  constructor(readonly payload: { validationInfo: string[]; couse?: Error }) {
    super('Bad request / validation failed', 400, payload.couse);
  }
}
