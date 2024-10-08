import type { AppConfig } from "./app-config.type";
import { DBConfig } from "./db-config.type";

export interface AllConfigType {
  app: AppConfig;
  db: DBConfig;
}
