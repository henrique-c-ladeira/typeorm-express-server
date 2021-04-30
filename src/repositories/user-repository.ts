import { getRepository, Repository } from "typeorm";
import { User } from "~/entity";

export class UserRepository extends Repository<User> {
  private readonly userRepository = getRepository(User);

  public getUsers = async (): Promise<User[]> => {
    const users = await this.userRepository.find();
    return users;
  };

  public getOne = async (userId: string): Promise<newUser> => {
    const user = await this.userRepository.findOne(userId);
    return user;
  };

  public saveUser = async (newUser: newUser): Promise<safeUser> => {
    try {
      const user = await this.userRepository.save(newUser);
      const safeUser: safeUser = user;

      return safeUser;
    } catch {
      throw new Error("could not save to database");
    }
  };

  public removeUser = async (userId: string): Promise<void> => {
    try {
      const user = await this.userRepository.findOne(userId);
      try {
        await this.userRepository.remove(user);
        console.log("Successfully deleted.");
      } catch {
        throw new Error("Something went wrong with out internal servers.");
      }
    } catch {
      throw new Error("User not found.");
    }
  };
}
