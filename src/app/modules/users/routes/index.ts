import { Router } from "express";

import { celebrate, Segments, Joi } from "celebrate";

import UserController from "../controllers/UserController";

const userRoutes = Router();

const userController = new UserController();

userRoutes.post(
  "/",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required().min(3),
    }),
  }),
  userController.create,
);

export default userRoutes;
