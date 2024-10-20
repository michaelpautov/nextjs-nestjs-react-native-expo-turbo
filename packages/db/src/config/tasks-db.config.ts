import { createDbConfig } from "./create-db-config";

if (!process.env.POSTGRES_TASK_DATABASE) {
  throw new Error("Missing POSTGRES_TASK_DATABASE ");
}

export default createDbConfig(process.env.POSTGRES_TASK_DATABASE);
