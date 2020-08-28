import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import authConfig from "../../../config/auth";
import AppError from "../../../erros/AppError";
import User from "../entities/User";
import IUsersRepository from "../repositories/IUsersRepository";

interface IRequest {
  email: string;
  password: string;
}
interface IResponse {
  token: string;
  user: User;
}

@injectable()
export default class AuthenticateUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const userExists = await this.usersRepository.findByEmail(email);

    if (!userExists) {
      throw new AppError("Incorrect credentials. Try again.");
    }

    const passwordMatched = await compare(password, userExists.password);

    if (!passwordMatched) {
      throw new AppError("Incorrect credentials. Try again.");
    }

    const { expiresIn, secret } = authConfig;

    const token = sign({}, secret, {
      expiresIn,
      subject: userExists.id,
    });

    return {
      token,
      user: userExists,
    };
  }
}
