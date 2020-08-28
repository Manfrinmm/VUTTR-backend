import { createConnection } from "typeorm";

async function connection(): Promise<void> {
  await createConnection();
}

export default connection;
