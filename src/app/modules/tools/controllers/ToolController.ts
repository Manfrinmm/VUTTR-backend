import { Request, Response } from "express";

import { container } from "tsyringe";

import CreateToolService from "../services/CreateToolService";
import DeleteToolService from "../services/DeleteToolService";
import ShowToolsByUserService from "../services/ShowToolsByUserService";
import UpdateToolService from "../services/UpdateToolService";

export default class ToolController {
  public async index(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;

    const tags = req.query.tags as string;
    const title = req.query.title as string;

    let filterTags;

    if (tags) {
      filterTags = tags.split(",").map(tag => tag.trim());
    }

    const showToolsByUser = container.resolve(ShowToolsByUserService);

    const tools = await showToolsByUser.execute({
      user_id,
      tags: filterTags,
      title,
    });

    return res.status(200).json(tools);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { title, link, description, tags } = req.body;

    const user_id = req.user.id;

    const createTool = container.resolve(CreateToolService);

    const tool = await createTool.execute({
      title,
      link,
      description,
      tags,
      user_id,
    });

    return res.status(201).json(tool);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const tool_id = Number(req.params.tool_id);

    const user_id = req.user.id;

    const { description, link, tags, title } = req.body;

    const updateTool = container.resolve(UpdateToolService);

    const tool = await updateTool.execute({
      tool_id,
      user_id,
      description,
      link,
      tags,
      title,
    });

    return res.status(200).json(tool);
  }

  public async destroy(req: Request, res: Response): Promise<Response> {
    const tool_id = Number(req.params.tool_id);

    const user_id = req.user.id;
    const deleteTool = container.resolve(DeleteToolService);

    await deleteTool.execute({
      tool_id,
      user_id,
    });

    return res.status(204).json();
  }
}
