import { inject, injectable } from "tsyringe";

import AppError from "../../../erros/AppError";
import Tool from "../entities/Tool";
import IToolsRepository from "../repositories/IToolsRepository";

interface IRequest {
  tool_id: number;
  user_id: string;
  title?: string;
  link?: string;
  description?: string;
  tags?: string[];
}

@injectable()
export default class UpdateToolService {
  constructor(
    @inject("ToolsRepository")
    private toolsRepository: IToolsRepository,
  ) {}

  public async execute({ tool_id, user_id, ...rest }: IRequest): Promise<Tool> {
    const tool = await this.toolsRepository.findById(tool_id);

    if (!tool) {
      throw new AppError("Tool not found");
    }

    if (tool.user_id !== user_id) {
      throw new AppError("You are not allowed to delete this tool.", 401);
    }

    const toolUpdated = await this.toolsRepository.update({
      ...rest,
      id: tool.id,
    });

    Object.assign(tool, toolUpdated);

    return tool;
  }
}
