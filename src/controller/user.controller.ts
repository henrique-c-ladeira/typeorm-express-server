import { NextFunction, Request, Response } from 'express';
import { hash, catchError } from '../helpers';
import { BadRequestError } from '../errors';
import { UserModel } from '../model/user';

export class UserController {
  constructor (private readonly usersModel: UserModel) {}

  public all = catchError(async (request: Request, response: Response, next: NextFunction): Response => {
    const useList = await this.usersModel.getAll();
    response.status(200).send(useList);
  });

  public one = catchError(async (request: Request, response: Response, next: NextFunction): Response => {
    const userId = request.params.id;
    if (!userId) throw new BadRequestError();
    const user = await this.usersModel.getOne(userId);
    response.status(200).send(user);
  });

  public save = catchError(async (request: Request, response: Response, next: NextFunction): Response => {
    const { name, email, password, phone, birthday } = request.body;
    if (!(name && email && password && phone && birthday)) { throw new BadRequestError(); }
    const hashedPassword = await hash(password);
    const newUser = {
      name,
      email,
      password: hashedPassword,
      phone,
      birthday
    };
    const user = await this.usersModel.save(newUser);

    response.status(200).send({ ...user });
  });

  public remove = catchError(async (request: Request, response: Response, next: NextFunction): Response => {
    const userId = request.params.id;
    if (!userId) throw new BadRequestError();
    await this.usersModel.remove(userId);
    response.sendStatus(204);
  });
}
