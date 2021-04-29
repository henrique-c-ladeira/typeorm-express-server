import { NextFunction, Request, Response } from 'express';

export const logger = async (req: Request, res: Response, next: NextFunction): NextFunction => {
  if (res.headersSent) {
    console.log('\x1b[36m%s\x1b[0m \x1b[43m\x1b[30m%s\x1b[0m', res.statusCode, req.method, req.url, req.connection.remoteAddress);
  } else {
    res.on('finish', function () {
      console.log('\x1b[36m%s\x1b[0m \x1b[43m\x1b[30m%s\x1b[0m', res.statusCode, req.method, req.url, req.connection.remoteAddress);
    });
  }
  next();
};
