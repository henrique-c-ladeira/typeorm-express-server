import { NextFunction, Request, Response } from 'express';

export const logger = async (req: Request, res: Response, next: NextFunction): NextFunction => {
  await next();
  console.log(res.statusCode, req.method, req.url, req.connection.remoteAddress);
};
