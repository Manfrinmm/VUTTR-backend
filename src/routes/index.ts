import { Router } from "express";

import toolRoutes from "../app/modules/tools/routes";
import userRoutes from "../app/modules/users/routes";
import sessionRoutes from "../app/modules/users/routes/sessions.routes";

const routes = Router();

routes.use("/sessions", sessionRoutes);
routes.use("/users", userRoutes);

routes.use("/tools", toolRoutes);

export default routes;
