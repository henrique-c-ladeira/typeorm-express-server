import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import { Token } from '../entity/Token';
import _ from 'lodash';

export const verifyJWT = async (req: Request, res: Response, next: NextFunction): NextFunction => {
  try {
    const token = req.headers.authorization;
    if (!token) throw new Error('Failed to authenticate token.');

    const decoded = await jwt.verify(token, process.env.JWT_PRIVATE);

    const tokenRepository = getRepository(Token);
    const invalidatedToken = await tokenRepository.findOne({ id: token });
    if (!_.isEmpty(invalidatedToken)) { throw new Error('Failed to authenticate token.'); }

    req.userId = decoded.id;
    req.token = token;
    next();
  } catch (err) {
    res.status(500).send({ auth: false, message: err.message });
  }
};
