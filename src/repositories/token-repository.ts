import { getRepository, Repository } from "typeorm";
import * as jwt from "jsonwebtoken";
import { Token, User } from "~/entity";

export class TokenRepository extends Repository<Token> {
  public createToken = async (user: User): Promise<string> => {
    const token = jwt.sign({ id: user.id }, process.env.JWT_PRIVATE, {
      expiresIn: "1h",
    });

    return token;
  };
}
