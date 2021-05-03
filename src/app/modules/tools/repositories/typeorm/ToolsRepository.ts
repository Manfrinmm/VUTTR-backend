import { Repository, getRepository } from "typeorm";

import ICreateToolDTO from "../../dtos/ICreateToolDTO";
import IFindToolByUserDTO from "../../dtos/IFindToolByUserDTO";
import IUpdateToolDTO from "../../dtos/IUpdateToolDTO";
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

  public async findById(id: number): Promise<Tool> {
    const tool = await this.ormRepository.findOne(id);

    return tool;
  }

  public async findAllByUser({
    user_id,
    tags,
    title,
  }: IFindToolByUserDTO): Promise<Tool[]> {
    const tools = await this.ormRepository.find({
      where: { user_id },
    });

    let toolsFiltered = tools;

    if (tools.length > 0) {
      if (tags?.length > 0) {
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
      } else if (title) {
        toolsFiltered = tools.filter(tool => tool.title.includes(title));
      }
    }

    return toolsFiltered;
  }

  public async update(data: IUpdateToolDTO): Promise<Tool> {
    const tool = await this.ormRepository.save(data);

    return tool;
  }

  public async delete(tool: Tool): Promise<void> {
    await this.ormRepository.remove(tool);
  }
}
