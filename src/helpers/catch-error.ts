import { Request, Response, NextFunction } from 'express';
// import { UnauthorizedError, AccessDeniedError, BadRequestError } from '../errors';

export const catchError = (fnc) =>
  async (req: Request, res: Response, next: NextFunction): NextFunction => {
    try {
      await fnc(req, res, next);
    } catch (error) {
      const payload = { code: 500, ...error };
      res.status(payload.code).send({ error: payload });
    }
  }
;
