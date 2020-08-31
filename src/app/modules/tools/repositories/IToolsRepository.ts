import ICreateToolDTO from "../dtos/ICreateToolDTO";
import IFindToolByUserDTO from "../dtos/IFindToolByUserDTO";
import Tool from "../entities/Tool";

export default interface IToolsRepository {
  create(data: ICreateToolDTO): Promise<Tool>;
  findAllByUser(data: IFindToolByUserDTO): Promise<Tool[]>;
}
