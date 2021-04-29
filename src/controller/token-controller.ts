import { NextFunction, Request, Response } from 'express';
import { catchError } from '~/helpers';
import { BadRequestError } from '~/errors';
import { TokenModel } from '~/model/token';

export class TokenController {
  constructor (private readonly tokenModel: TokenModel) {}

  public create = catchError(async (request: Request, response: Response, next: NextFunction): Response => {
    const { email, password } = request.body;
    if (!(email && password)) throw new BadRequestError();
    const token = await this.tokenModel.create({ email, password });
    response.status(200).send({ jwt: token });
  })

  public invalidate = catchError(async (request: Request, response: Response, next: NextFunction): Response => {
    const tokenToInvalidate = { id: request.token };
    await this.tokenModel.invalidate(tokenToInvalidate);
    response.sendStatus(204);
  });
}
