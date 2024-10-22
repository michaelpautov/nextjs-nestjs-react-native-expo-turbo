import type { AppConfig } from "./app/app-config.type";
import { DBConfig } from "./db/db-config.type";
import { MailConfig } from "./mail/mail-config.type";

export interface AllConfigType {
  app: AppConfig;
  db: DBConfig;
  mail: MailConfig;
}
