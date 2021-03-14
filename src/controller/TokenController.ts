import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { Token } from '../entity/Token';
import { User } from '../entity/User';
import { checkHash } from '../helpers/crypto';
import * as jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../errors/unauthorized-error';
import { catchError } from '../helpers/catch-error';

export class TokenController {
  private readonly userRepository = getRepository(User)
  private readonly tokenRepository = getRepository(Token)

  public create = catchError(async (request: Request, response: Response, next: NextFunction): Response => {
    const { email, password } = request.body;
    const userToValidate = await this.userRepository.findOneOrFail({ email: email });
    const isAutenticated = await checkHash(password, userToValidate.password);
    if (!isAutenticated) { throw new UnauthorizedError(); }

    const newToken = jwt.sign({ id: userToValidate.id },
      process.env.JWT_PRIVATE,
      { expiresIn: '1h' });

    response.status(200).send({ jwt: newToken });
  })

  public invalidate = catchError(async (request: Request, response: Response, next: NextFunction): Response => {
    const invalidatedToken = { id: request.token };
    await this.tokenRepository.save(invalidatedToken);
    response.sendStatus(204);
  });
}
