import { inject, injectable } from "tsyringe";

import ICreateToolDTO from "../dtos/ICreateToolDTO";
import Tool from "../entities/Tool";
import IToolsRepository from "../repositories/IToolsRepository";

@injectable()
export default class CreateToolService {
  constructor(
    @inject("ToolsRepository")
    private toolsRepository: IToolsRepository,
  ) {}

  public async execute({
    title,
    link,
    description,
    tags,
    user_id,
  }: ICreateToolDTO): Promise<Tool> {
    const tool = await this.toolsRepository.create({
      title,
      link,
      description,
      tags,
      user_id,
    });

    return tool;
  }
}
