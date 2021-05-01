import { getRepository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import { Token, User } from '~/entity';
import { checkHash } from '~/utils';
import { UnauthorizedError } from '~/errors';

interface credentials {
  email: string;
  password: string;
}

interface token {
  id: string;
}

export class TokenModel {
  private readonly userRepository = getRepository(User);
  private readonly tokenRepository = getRepository(Token);

  public create = async (credentials: credentials): Promise<string> => {
    const userToValidate = await this.userRepository.findOneOrFail({
      email: credentials.email,
    });
    const isAutenticated = await checkHash(
      credentials.password,
      userToValidate.password,
    );
    if (!isAutenticated) {
      throw new UnauthorizedError();
    }

    if (!process.env.JWT_PRIVATE) {
      throw new Error('error in jwt token');
    }

    const token = jwt.sign({ id: userToValidate.id }, process.env.JWT_PRIVATE, {
      expiresIn: '1h',
    });

    return token;
  };

  public invalidate = async (token: token): Promise<void> => {
    try {
      await this.tokenRepository.save(token);
    } catch {
      throw new Error('could not save to database');
    }
  };
}
