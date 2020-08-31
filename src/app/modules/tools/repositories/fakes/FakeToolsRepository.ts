import ICreateToolDTO from "../../dtos/ICreateToolDTO";
import IFindToolByUserDTO from "../../dtos/IFindToolByUserDTO";
import IUpdateToolDTO from "../../dtos/IUpdateToolDTO";
import Tool from "../../entities/Tool";
import IToolsRepository from "../IToolsRepository";

export default class FakeToolsRepository implements IToolsRepository {
  private tools: Tool[] = [];

  public async create(toolData: ICreateToolDTO): Promise<Tool> {
    const tool = new Tool();

    Object.assign(tool, { id: Math.floor(Math.random() * 100) }, toolData);

    this.tools.push(tool);

    return tool;
  }

  public async findById(id: number): Promise<Tool | undefined> {
    return this.tools.find(tool => tool.id === id);
  }

  public async findAllByUser({
    user_id,
    tags,
  }: IFindToolByUserDTO): Promise<Tool[]> {
    const toolsFilteredByUser = this.tools.filter(
      tool => tool.user_id === user_id,
    );

    let toolsFiltered: Tool[] = toolsFilteredByUser;

    if (toolsFilteredByUser.length > 0 && tags?.length > 0) {
      toolsFiltered = [];

      toolsFilteredByUser.forEach(tool => {
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

  public async update({ id, ...rest }: IUpdateToolDTO): Promise<Tool> {
    const toolPosition = this.tools.findIndex(tool => tool.id === id);

    this.tools[toolPosition] = {
      ...this.tools[toolPosition],
      ...rest,
    };

    return this.tools[toolPosition];
  }

  public async delete(tool: Tool): Promise<void> {
    this.tools = this.tools.filter(toolItem => toolItem.id !== tool.id);
  }
}
