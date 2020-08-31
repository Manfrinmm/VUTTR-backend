import { Repository, getRepository } from "typeorm";

import ICreateToolDTO from "../../dtos/ICreateToolDTO";
import IFindToolByUserDTO from "../../dtos/IFindToolByUserDTO";
import Tool from "../../entities/Tool";
import IToolsRepository from "../IToolsRepository";

export default class ToolsRepository implements IToolsRepository {
  private ormRepository: Repository<Tool>;

  constructor() {
    this.ormRepository = getRepository(Tool);
  }

  public async create({
    title,
    link,
    description,
    tags,
    user_id,
  }: ICreateToolDTO): Promise<Tool> {
    const tool = this.ormRepository.create({
      title,
      link,
      description,
      tags,
      user_id,
    });

    await this.ormRepository.save(tool);

    return tool;
  }

  async findAllByUser({ user_id, tags }: IFindToolByUserDTO): Promise<Tool[]> {
    let tools: Tool[] = [];

    tools = await this.ormRepository.find({
      where: { user_id },
    });

    let toolsFiltered: Tool[] = tools;

    if (tools.length > 0 && tags?.length > 0) {
      toolsFiltered = [];

      tools.forEach(tool => {
        tool.tags.forEach(tag => {
          if (tags.includes(tag)) {
            const toolFilteredAlreadyAdded = toolsFiltered.find(
              toolFiltered => toolFiltered.id === tool.id,
            );

            if (!toolFilteredAlreadyAdded) {
              toolsFiltered.push(tool);
            }
          }
        });
      });
    }

    return toolsFiltered;
  }
}
