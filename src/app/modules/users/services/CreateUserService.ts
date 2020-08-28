import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import AppError from "../../../erros/AppError";
import User from "../entities/User";
import IUsersRepository from "../repositories/IUsersRepository";

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
export default class CreateUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const emailAlreadyUsed = await this.usersRepository.findByEmail(email);

    if (emailAlreadyUsed) {
      throw new AppError("Email already used");
    }

    const password_hash = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      email,
      password: password_hash,
    });

    return user;
  }
}
