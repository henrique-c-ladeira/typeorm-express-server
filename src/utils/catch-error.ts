import { Request, Response, NextFunction } from 'express';

export const catchError = (fnc) => async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await fnc(req, res, next);
  } catch (error) {
    const payload = { code: 500, ...error };
    res.status(payload.code).send({ ...payload, message: error.message });
  }
};
