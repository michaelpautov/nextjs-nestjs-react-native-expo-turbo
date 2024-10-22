import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import appConfig from "../../config/app/app.config";
import dbConfig from "../../config/db/db.config";
import mailConfig from "../../config/mail/mail.config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, dbConfig, mailConfig],
    }),
  ],
  controllers: [],
})
export class APIConfigModule {}

export * from "../../config/config.type";
