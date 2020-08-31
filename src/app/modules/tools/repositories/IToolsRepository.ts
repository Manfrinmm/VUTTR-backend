import ICreateToolDTO from "../dtos/ICreateToolDTO";
import IFindToolByUserDTO from "../dtos/IFindToolByUserDTO";
import IUpdateToolDTO from "../dtos/IUpdateToolDTO";
import Tool from "../entities/Tool";

export default interface IToolsRepository {
  create(data: ICreateToolDTO): Promise<Tool>;
  findById(id: number): Promise<Tool | null>;
  findAllByUser(data: IFindToolByUserDTO): Promise<Tool[]>;
  update(data: IUpdateToolDTO): Promise<Tool>;
  delete(tool: Tool): Promise<void>;
}
