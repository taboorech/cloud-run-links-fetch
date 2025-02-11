import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../libs/classes/CustomError.class';
import { ValidationError } from 'yup';

export const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  if(err instanceof ValidationError) {
    res.status(400).send({ errors: [{ message: err.errors }] });
    return next(err);
  }

  res.status(err.statusNumber || 500).send({ errors: [{ message: err.message || "Something went wrong" }] });

  return next(err);
};