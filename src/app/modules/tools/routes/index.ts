import { Router } from "express";

import { celebrate, Segments, Joi } from "celebrate";

import ensureAuthenticatedUser from "../../../middlewares/ensureAuthenticatedUser";
import ToolController from "../controllers/ToolController";

const toolRoutes = Router();

const toolController = new ToolController();

toolRoutes.use(ensureAuthenticatedUser);

toolRoutes.get("/", toolController.index);
toolRoutes.post(
  "/",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().required(),
      link: Joi.string().required(),
      description: Joi.string().required(),
      tags: Joi.array().items(Joi.string()).required(),
    }),
  }),
  toolController.create,
);
toolRoutes.put(
  "/:tool_id",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().required(),
      link: Joi.string().required(),
      description: Joi.string().required(),
      tags: Joi.array().items(Joi.string()).required(),
    }),
    [Segments.PARAMS]: {
      tool_id: Joi.number().required(),
    },
  }),
  toolController.update,
);
toolRoutes.delete(
  "/:tool_id",
  celebrate({
    [Segments.PARAMS]: {
      tool_id: Joi.number().required(),
    },
  }),
  toolController.destroy,
);

export default toolRoutes;
