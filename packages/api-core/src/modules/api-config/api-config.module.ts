import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import appConfig from "../../config/app.config";
import dbConfig from "../../config/db.config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, dbConfig],
    }),
  ],
  controllers: [],
})
export class APIConfigModule {}

export * from "../../config/config.type";
