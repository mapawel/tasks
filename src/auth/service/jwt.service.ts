import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";
import { config } from "dotenv-safe";
import { IUserPayload } from "../../auth/interfaces/user-payload.interface";

config();

interface IUserDecoded extends IUserPayload {
  iat: number;
  exp: number;
}

export class JwtService {
  static sign(object: IUserPayload, time?: string | number) {
    return new Promise((resolve, reject) => {
      if (!process.env.JWT_SECRET) return reject("JWT_SECRET is not defined");
      if (!process.env.JWT_EXPIRES_IN && !time)
        return reject("JWT_EXPIRES_IN is not defined nor time is passed");

      jwt.sign(
        object,
        process.env.JWT_SECRET,
        {
          expiresIn: time || process.env.JWT_EXPIRES_IN,
        },
        (err, token) => {
          if (err || !token) {
            return reject(err || "Token is not defined");
          }
          resolve(token);
        }
      );
    });
  }

  static verify(token: string): Promise<IUserDecoded> {
    return new Promise((resolve, reject) => {
      if (!process.env.JWT_SECRET) return reject("JWT_SECRET is not defined");

      jwt.verify(
        token,
        process.env.JWT_SECRET,
        (err: VerifyErrors | null, decode: JwtPayload | string | undefined) => {
          if (err) {
            return reject(err);
          }
          resolve(decode as IUserDecoded);
        }
      );
    });
  }
}
