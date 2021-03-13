import { getRepository } from 'typeorm'
import { NextFunction, Request, Response } from 'express'
import { User } from '../entity/User'
import { hash } from '../helpers/crypto'

export class UserController {
  private readonly userRepository = getRepository(User)

  async all (request: Request, response: Response, next: NextFunction): Response {
    const users = await this.userRepository.find()
    const safeUsers = users.map((elem) => {
      const { password, id, ...safeUser } = elem
      return safeUser
    })
    return safeUsers
  }

  async one (request: Request, response: Response, next: NextFunction): Response {
    return await this.userRepository.findOne(request.params.id)
  }

  async save (request: Request, response: Response, next: NextFunction): Response {
    try {
      const { name, email, password, phone, birthday } = request.body
      const hashedPassword = await hash(password)
      const newUser = {
        name,
        email,
        password: hashedPassword,
        phone,
        birthday
      }

      return await this.userRepository.save(newUser)
    } catch (error) {
      return response.status(400).send({ error: error.message })
    }
  }

  async remove (request: Request, response: Response, next: NextFunction): Response {
    const userToRemove = await this.userRepository.findOne(request.params.id)
    if (userToRemove == null) { return response.status(400).send({ error: 'There is no such user.' }) }
    return await this.userRepository.remove(userToRemove)
  }
}
