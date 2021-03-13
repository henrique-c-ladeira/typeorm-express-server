import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { Token } from '../entity/Token';
import { User } from '../entity/User';
import { checkHash } from '../helpers/crypto';
import * as jwt from 'jsonwebtoken';

export class TokenController {
  private readonly userRepository = getRepository(User)
  private readonly tokenRepository = getRepository(Token)

  async create (request: Request, response: Response, next: NextFunction): Response {
    try {
      const { email, password } = request.body;
      const userToValidate = await this.userRepository.findOneOrFail({ email: email });
      const isAutenticated = await checkHash(password, userToValidate.password);
      if (!isAutenticated) { return response.sendStatus(401); }

      const newToken = {
        id: jwt.sign({ id: userToValidate.id },
          process.env.JWT_PRIVATE,
          { expiresIn: '1h' })
      };

      return response.status(200).send({ jwt: newToken });
    } catch (error) {
      return response.status(500).send({ error: error.message });
    }
  }

  async invalidate (request: Request, response: Response, next: NextFunction): Response {
    try {
      const invalidatedToken = { id: request.token };

      await this.tokenRepository.save(invalidatedToken);
      return response.sendStatus(204);
    } catch (error) {
      return response.status(500).send({ error: error.message });
    }
  }
}
