import { config } from "dotenv";
import dotenvExpand from "dotenv-expand";

import app from "./app";

dotenvExpand(config());

const appPort = process.env.APP_PORT || 3000;

app.listen(appPort, () => {
  // eslint-disable-next-line no-console
  console.log(
    `Server started on port ${appPort} 🚀. MODE[${process.env.NODE_ENV}]`,
  );
});
