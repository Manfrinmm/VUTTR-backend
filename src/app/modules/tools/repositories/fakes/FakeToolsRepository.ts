import { v4 } from "uuid";

import ICreateToolDTO from "../../dtos/ICreateToolDTO";
import IFindToolByUserDTO from "../../dtos/IFindToolByUserDTO";
import Tool from "../../entities/Tool";
import IToolsRepository from "../IToolsRepository";

export default class FakeToolsRepository implements IToolsRepository {
  private tools: Tool[] = [];

  public async create(toolData: ICreateToolDTO): Promise<Tool> {
    const tool = new Tool();

    Object.assign(tool, { id: v4() }, toolData);

    this.tools.push(tool);

    return tool;
  }

  public async findAllByUser({ user_id }: IFindToolByUserDTO): Promise<Tool[]> {
    const toolsFiltered = this.tools.filter(tool => tool.user_id === user_id);

    return toolsFiltered;
  }
}
