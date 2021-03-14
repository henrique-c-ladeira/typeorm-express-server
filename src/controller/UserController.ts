/* eslint-disable no-unreachable */
import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { User } from '../entity/User';
import { hash } from '../helpers/crypto';
import { catchError } from '../helpers/catch-error';
import { BadRequestError } from '../errors';

export class UserController {
  private readonly userRepository = getRepository(User)

  public all = catchError(async (request: Request, response: Response, next: NextFunction): Response => {
    const users = await this.userRepository.find();
    const safeUsers = users.map((elem) => {
      const { password, id, ...safeUser } = elem;
      return safeUser;
    });
    response.status(200).send(safeUsers);
  });

  public one = catchError(async (request: Request, response: Response, next: NextFunction): Response => {
    const user = await this.userRepository.findOne(request.params.id);
    if (!user) throw new BadRequestError();
    const { password, ...safeUser } = user;
    response.status(200).send(safeUser);
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
    await this.userRepository.save(newUser);
    response.status(200).send({ name: newUser.name, email: newUser.email, phone: newUser.phone, birthday: newUser.birthday });
  });

  public remove = catchError(async (request: Request, response: Response, next: NextFunction): Response => {
    const userToRemove = await this.userRepository.findOne(request.params.id);
    if (userToRemove == null) { throw new BadRequestError(); }
    response.sendStatus(204);
  });
}
