import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import _ from 'lodash';
import { Token } from '~/entity';
import { UnauthorizedError, AccessDeniedError } from '~/errors';
import { catchError } from '~/utils';

export const verifyJWT = catchError(async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) throw new UnauthorizedError();

  if (!process.env.JWT_PRIVATE) { throw new Error('error in jwt token'); }

  const { id } = jwt.verify(token, process.env.JWT_PRIVATE) as TokenInterface;
  req.user = { id };

  // Check if token is invalidated
  const tokenRepository = getRepository(Token);
  const invalidatedToken = await tokenRepository.findOne({ id: token });
  if (!_.isEmpty(invalidatedToken)) { throw new AccessDeniedError(); }

  req.token = token;
  next();
});
