import {Response} from 'express';

export const errorMessage = (res: Response, statusCode: number, message: string) => {
  return res.status(statusCode).json({
    status: "error",
    error: message
  });
}
