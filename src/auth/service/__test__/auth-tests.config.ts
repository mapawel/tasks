import { NextFunction, Request, Response } from 'express';

export type UserCredentials = {
  email: string;
  password: string;
};

export class AuthTestsConfig {
  readonly testUserCredentials = {
    email: 'testuser',
    password: 'testpassword',
  };

  public mockedUserRepository = {
    findOne: jest.fn(),
  };

  readonly mockedRequest: Request = {} as unknown as Request;

  readonly mockedResponse: Response = {
    json: jest.fn(),
  } as unknown as Response;

  readonly mockedNextFn: NextFunction = jest.fn() as unknown as NextFunction;

  public createMockedRequestWithBody(body: object): Request {
    return { body: JSON.stringify(body) } as unknown as Request;
  }
}
