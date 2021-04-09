import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { Token, User } from '../entity';
import { checkHash, catchError } from '../helpers';
import { BadRequestError, UnauthorizedError } from '../errors';

export class TokenController {
  private readonly userRepository = getRepository(User)
  private readonly tokenRepository = getRepository(Token)

  public create = catchError(async (request: Request, response: Response, next: NextFunction): Response => {
    const { email, password } = request.body;
    if (!(email && password)) throw new BadRequestError();
    const userToValidate = await this.userRepository.findOneOrFail({ email: email });
    const isAutenticated = await checkHash(password, userToValidate.password);
    if (!isAutenticated) { throw new UnauthorizedError(); }

    const newToken = jwt.sign({ id: userToValidate.id },
      process.env.JWT_PRIVATE,
      { expiresIn: '1h' });

    response.status(200).send({ username: userToValidate.name, jwt: newToken });
  })

  public invalidate = catchError(async (request: Request, response: Response, next: NextFunction): Response => {
    const invalidatedToken = { id: request.token };
    try {
      await this.tokenRepository.save(invalidatedToken);
    } catch {
      throw new Error('could not save to database');
    }
    response.sendStatus(204);
  });
}
