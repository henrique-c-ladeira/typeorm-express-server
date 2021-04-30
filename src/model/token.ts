import { checkHash } from "~/helpers";
import { UnauthorizedError } from "~/errors";
import { TokenRepository, UserRepository } from "~/repositories";

interface token {
  id: string;
}

export class TokenModel {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tokenRepository: TokenRepository
  ) {}

  public create = async (credentials: credentials): Promise<string> => {
    const userToValidate = await this.userRepository.findOneOrFail({
      email: credentials.email,
    });

    const isAutenticated = await checkHash(
      credentials.password,
      userToValidate.password
    );

    if (!isAutenticated) {
      throw new UnauthorizedError();
    }

    return await this.tokenRepository.createToken(userToValidate);
  };

  public invalidate = async (token: token): Promise<void> => {
    try {
      await this.tokenRepository.save(token);
    } catch {
      throw new Error("could not save to database");
    }
  };
}
