import { container } from "tsyringe";

import IToolsRepository from "../modules/tools/repositories/IToolsRepository";
import ToolsRepository from "../modules/tools/repositories/typeorm/ToolsRepository";
import IUsersRepository from "../modules/users/repositories/IUsersRepository";
import UsersRepository from "../modules/users/repositories/typeorm/UsersRepository";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository,
);

container.registerSingleton<IToolsRepository>(
  "ToolsRepository",
  ToolsRepository,
);
