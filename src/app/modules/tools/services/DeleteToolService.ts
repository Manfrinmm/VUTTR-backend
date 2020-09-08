import { inject, injectable } from "tsyringe";

import AppError from "../../../erros/AppError";
import IToolsRepository from "../repositories/IToolsRepository";

interface IRequest {
  tool_id: number;
  user_id: string;
}

@injectable()
export default class DeleteToolService {
  constructor(
    @inject("ToolsRepository")
    private toolsRepository: IToolsRepository,
  ) {}

  public async execute({ tool_id, user_id }: IRequest): Promise<void> {
    const tool = await this.toolsRepository.findById(tool_id);

    if (!tool) {
      throw new AppError("Tool not found");
    }

    if (tool.user_id !== user_id) {
      throw new AppError("You are not allowed to delete this tool.", 403);
    }

    await this.toolsRepository.delete(tool);
  }
}
