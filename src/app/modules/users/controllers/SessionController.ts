import { Request, Response } from "express";

import { classToClass } from "class-transformer";
import { container } from "tsyringe";

import AuthenticateUserService from "../services/AuthenticateUserService";

export default class SessionController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const { token, user } = await authenticateUser.execute({
      email,
      password,
    });

    return res.status(201).json({ token, user: classToClass(user) });
  }
}
