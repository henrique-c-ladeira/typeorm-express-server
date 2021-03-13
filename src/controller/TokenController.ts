import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Token} from "../entity/Token";
import { User } from "../entity/User";

import * as jwt from 'jsonwebtoken';

export class TokenController {

  private userRepository = getRepository(User);
  private tokenRepository = getRepository(Token);

  async one(request: Request, response: Response, next: NextFunction) {
    return this.tokenRepository.findOne(request.params.id);
  }

  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const userToValidate = await this.userRepository.findOne({where: {email: request.body.email}});
      if (request.body.password !== userToValidate.password)
        return response.sendStatus(401);


      const newToken = {
        id: jwt.sign({id: userToValidate.id},
          process.env.JWT_PRIVATE, 
          { expiresIn: '1h' }),
        expires: Math.floor(Date.now()/1000 + 60 * 60),
        user: userToValidate,
      }
      
      await this.tokenRepository.save(newToken);
      return response.status(200).send(newToken);
    } catch (error) {
      return response.status(400).send({error: error.message});
    }
  }

  async extends(request: Request, response: Response, next: NextFunction) {
    try {
      const tokenToExtend = await this.tokenRepository.findOne(request.token);

      tokenToExtend.expires = Math.floor(Date.now()/1000 + 60 * 60)
      await this.tokenRepository.save(tokenToExtend);
      return response.status(200).send(tokenToExtend);
    } catch (error) {
      return response.status(400).send({error: error.message});
    }
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    try{
      const tokenToRemove = await this.tokenRepository.findOne(request.params.id);
      return await this.tokenRepository.remove(tokenToRemove);
    } catch (error) {
      return response.status(400).send({error: error.message});
    }
  }

}