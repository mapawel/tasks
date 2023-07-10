import { Request, Response } from "express";
import { HttpException } from "../../exceptions/http.exception";
import { BadRequestException } from "../../exceptions/bad-request.exception";

export const appExceptionMiddleware = (
  error: HttpException,
  req: Request,
  res: Response
) => {
  console.error(
    " --> APP ERROR: ",
    error instanceof Object ? JSON.stringify(error, null, 2) : error,
    " <--"
  );

  if (!error?.code || typeof error?.code === "string")
    return res.status(500).json("Internal server error");

  if (error instanceof BadRequestException)
    return res.status(error.code).json({
      message: error.message,
      errors: error.payload.errors,
    });

  return res.status(error.code).json(error.message);
};
