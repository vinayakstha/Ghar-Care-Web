import { HttpError } from "../../errors/http-error";
import { UserRepository } from "../../repositories/user.repository";

let userRepository = new UserRepository();

export class AdminUserService {
  async getAllUsers() {
    const users = await userRepository.getAllUsers();

    if (!users) {
      throw new HttpError(404, "Users not found");
    }

    return users;
  }
}
