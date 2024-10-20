import { createDbConfig } from "./create-db-config";

if (!process.env.POSTGRES_USER_DATABASE) {
  throw new Error("Missing POSTGRES_USER_DATABASE ");
}

export default createDbConfig(process.env.POSTGRES_USER_DATABASE);
