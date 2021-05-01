import { NextFunction, Request, Response } from 'express';
import { hash, catchError } from '~/utils';
import { BadRequestError } from '~/errors';
import { UserModel } from '~/model/user';

export class UserController {
  private readonly Users = new UserModel();

  public all = catchError(
    async (request: Request, response: Response, next: NextFunction) => {
      const users = await this.Users.getAll();
      response.status(200).send(users);
    },
  );

  public one = catchError(
    async (request: Request, response: Response, next: NextFunction) => {
      const userId = request.params.id;
      if (!userId) throw new BadRequestError();
      const user = await this.Users.getOne(userId);
      response.status(200).send(user);
    },
  );

  public save = catchError(
    async (request: Request, response: Response, next: NextFunction) => {
      const { name, email, password, phone, birthday } = request.body;
      if (!(name && email && password && phone && birthday)) {
        throw new BadRequestError();
      }
      const hashedPassword = await hash(password);
      const newUser = {
        name,
        email,
        password: hashedPassword,
        phone,
        birthday,
      };
      const user = await this.Users.save(newUser);

      response.status(200).send({ ...user });
    },
  );

  public remove = catchError(
    async (request: Request, response: Response, next: NextFunction) => {
      const userId = request.params.id;
      if (!userId) throw new BadRequestError();
      await this.Users.remove(userId);
      response.sendStatus(204);
    },
  );
}
