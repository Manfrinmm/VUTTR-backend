import { v4 } from "uuid";

import ICreateUserDTO from "../../dtos/ICreateUserDTO";
import User from "../../entities/User";
import IUsersRepository from "../IUsersRepository";

export default class FakeUsersRepository implements IUsersRepository {
  users: User[] = [];

  public async create({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, {
      id: v4(),
      name,
      email,
      password,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.users.push(user);

    return user;
  }

  public async findByEmail(email: string): Promise<User> {
    const user = this.users.find(userStored => userStored.email === email);

    return user;
  }
}
