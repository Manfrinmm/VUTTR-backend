import { Request, Response } from "express";

import { classToClass } from "class-transformer";
import { container } from "tsyringe";

import CreateUserService from "../services/CreateUserService";

export default class UserController {
  public async create(req: Request, res: Response): Promise<Response> {
    const createUser = container.resolve(CreateUserService);

    const { name, email, password } = req.body;

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    return res.status(201).json(classToClass(user));
  }
}
