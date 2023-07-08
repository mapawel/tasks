import { HttpException } from "./http.exception";

export class UnauthorizedException extends HttpException {
  constructor(readonly payload?: { couse?: Error }) {
    super('User not authorized!', 401, payload?.couse);
  }
}
