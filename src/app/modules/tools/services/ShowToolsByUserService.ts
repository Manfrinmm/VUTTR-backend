import { inject, injectable } from "tsyringe";

import Tool from "../entities/Tool";
import IToolsRepository from "../repositories/IToolsRepository";

interface IRequest {
  user_id: string;
  tags?: string[];
}

@injectable()
export default class ShowToolsByUserService {
  constructor(
    @inject("ToolsRepository")
    private toolsRepository: IToolsRepository,
  ) {}

  public async execute({ user_id, tags }: IRequest): Promise<Tool[]> {
    const tools = await this.toolsRepository.findAllByUser({
      user_id,
      tags,
    });

    return tools;
  }
}
