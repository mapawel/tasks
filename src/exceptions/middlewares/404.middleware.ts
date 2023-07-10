import { NotFoundException } from "../../exceptions/not-found.exception";
import { NextFunction, Request, Response } from "express";

export const middleware404 = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  next(new NotFoundException());
};
