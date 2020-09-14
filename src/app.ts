import express, { Response, Request, NextFunction } from "express";
import "express-async-errors";

import { errors } from "celebrate";
import cors from "cors";

import AppError from "./app/erros/AppError";
import connection from "./database";
import routes from "./routes";
import "./app/container";

connection();

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.use(express.static("docs/documentation/swagger"));

app.use(errors());

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.status).json({
      type: "error",
      message: err.message,
    });
  }

  if (process.env.NODE_ENV === "development") {
    return res.status(500).json({
      type: "error",
      message: err.message,
    });
  }

  return res.status(500).json({
    type: "error",
    message: "Internal server error",
  });
});

export default app;
