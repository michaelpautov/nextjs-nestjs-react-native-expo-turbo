import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import appConfig from "../../config/app.config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),
  ],
  controllers: [],
})
export class APIConfigModule {}

export * from "../../config/config.type";
