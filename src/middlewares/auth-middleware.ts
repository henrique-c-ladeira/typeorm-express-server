import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import _ from 'lodash';
import { Token } from '../entity';
import { UnauthorizedError, AccessDeniedError } from '../errors';
import { catchError } from '../helpers';

export const verifyJWT = catchError(async (req: Request, res: Response, next: NextFunction): NextFunction => {
  const token = req.headers.authorization;
  if (!token) throw new UnauthorizedError();

  try {
    const decoded = await jwt.verify(token, process.env.JWT_PRIVATE);
    req.userId = decoded.id;
  } catch {
    throw new UnauthorizedError();
  }

  // Check if token is invalidated
  const tokenRepository = getRepository(Token);
  const invalidatedToken = await tokenRepository.findOne({ id: token });
  if (!_.isEmpty(invalidatedToken)) { throw new AccessDeniedError(); }

  req.token = token;
  next();
});
