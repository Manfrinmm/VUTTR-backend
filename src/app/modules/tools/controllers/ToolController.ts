import { Request, Response } from "express";

import { container } from "tsyringe";

import CreateToolService from "../services/CreateToolService";
import ShowToolsByUserService from "../services/ShowToolsByUserService";

export default class ToolController {
  public async index(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;

    const tags = req.query.tags as string;

    let filterTags;

    if (tags) {
      filterTags = tags.split(",").map(tag => tag.trim());
    }

    const showToolsByUser = container.resolve(ShowToolsByUserService);

    const tools = await showToolsByUser.execute({
      user_id,
      tags: filterTags,
    });

    return res.status(200).json(tools);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { user_id, title, link, description, tags } = req.body;

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
}
