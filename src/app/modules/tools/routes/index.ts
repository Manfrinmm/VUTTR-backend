import { Router } from "express";

import ensureAuthenticatedUser from "../../../middlewares/ensureAuthenticatedUser";
import ToolController from "../controllers/ToolController";

const toolRoutes = Router();

const toolController = new ToolController();

toolRoutes.use(ensureAuthenticatedUser);

toolRoutes.get("/", toolController.index);
toolRoutes.post("/", toolController.create);

export default toolRoutes;
