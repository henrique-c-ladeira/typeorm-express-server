import { getRepository } from 'typeorm';
import { User } from '~/entity';


export class UserRepository {
  private readonly userRepository = getRepository(User)

  public getUsers = async (): Promise<User[]> => {
    const users = await this.userRepository.find();
    return users;
  }
}