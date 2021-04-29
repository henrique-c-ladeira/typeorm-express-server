import { getRepository } from 'typeorm';
import { User } from '~/entity';

export class UserRepository {
  private readonly userRepository = getRepository(User)

  public getUsers = async (): Promise<User[]> => {
    const users = await this.userRepository.find();
    return users;
  }

  public getOne = async (userId: string): Promise<newUser> => {
    const user = await this.userRepository.findOne(userId);
    return user;
  }
}