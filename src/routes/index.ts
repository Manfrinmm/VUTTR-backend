import { Router } from "express";

import userRoutes from "../app/modules/users/routes";
import sessionRoutes from "../app/modules/users/routes/sessions.routes";

const routes = Router();

routes.use("/sessions", sessionRoutes);
routes.use("/users", userRoutes);

export default routes;
