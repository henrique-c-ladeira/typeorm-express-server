import { UserRepository } from "~/repositories/user-repository";

export class UserModel {
  constructor(private readonly userRepository: UserRepository) {}

  public findAll = async (): Promise<safeUser[]> => {
    const users = await this.userRepository.getUsers();
    const safeUsers = users.map((elem) => {
      const { password, id, ...safeUser } = elem;
      return safeUser;
    });
    return safeUsers;
  };

  public findOne = async (userId: string): Promise<safeUser> => {
    if (!userId) throw new Error("Please provide an ID to search");

    const user: Promise<safeUser> = this.userRepository.getOne(userId);
    if (!user) throw new Error("There is no such user.");

    return user;
  };

  public addUser = async (newUser: newUser): Promise<safeUser> => {
    if (!newUser) throw new Error("Missing fields");

    try {
      const user = await this.userRepository.saveUser(newUser);
      return user;
    } catch {
      throw new Error("Failed to save.");
    }
  };

  public removeUser = async (userId: string): Promise<void> => {
    if (!userId) throw new Error("You must provide the user's ID to remove");

    try {
      await this.userRepository.removeUser(userId);
    } catch {
      throw new Error("Something went wrong with the request.");
    }
  };
}
