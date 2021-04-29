import { UserRepository } from "~/repositories/user-repository";

export class UserModel {
  constructor (private readonly userRepository: UserRepository) {}

  public getAll = async (): Promise<safeUser[]> => {
    const users = await this.userRepository.getUsers();
    const safeUsers = users.map((elem) => {
      const { password, id, ...safeUser } = elem;
      return safeUser;
    });
    return safeUsers;
  }

  public getOne = async (userId: string): Promise<safeUser> => {
    if (!userId) throw new Error('Please provide an ID to search');

    const user = this.userRepository.getOne(userId);
    if (!user) throw new Error('There is no such user.');

    const { password, ...safeUser } = user;
    return safeUser;
  }

  public save = async (newUser: newUser): Promise<safeUser> => {
    try {
      await this.userRepository.save(newUser);
      const { password, ...safeUser } = newUser;
      return safeUser;
    } catch {
      throw new Error('could not save to database');
    }
  }

  public remove = async (userId): Promise<void> => {
    throw new Error('not implemented yet');
  }
}
