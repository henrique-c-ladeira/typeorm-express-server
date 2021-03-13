import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {User} from "../entity/User";

export class UserController {

  private userRepository = getRepository(User);

  async all(request: Request, response: Response, next: NextFunction) {
    const users = await this.userRepository.find();
    const safeUsers = users.map((elem) => {
      const {password, id, ...safeUser} = elem;
      return safeUser; 
    })
    return safeUsers;
  }

  async one(request: Request, response: Response, next: NextFunction) {
    return this.userRepository.findOne(request.params.id);
  }

  async save(request: Request, response: Response, next: NextFunction) {
    try {
      return await this.userRepository.save(request.body);
    } catch (error) {
      return response.status(400).send({error: error.message});
    }
  }

  async remove(request: Request, response: Response, next: NextFunction) {
      const userToRemove = await this.userRepository.findOne(request.params.id);
      if(!userToRemove)
        return response.status(400).send({error: 'There is no such user.'});
      return await this.userRepository.remove(userToRemove);
  }

}