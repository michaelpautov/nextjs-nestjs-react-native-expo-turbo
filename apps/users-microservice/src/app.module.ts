import { Module } from "@nestjs/common";

import { APICoreModule } from "@app/api-core";

import { AppController } from "./app.controller";

@Module({
  imports: [APICoreModule],
  controllers: [AppController],
})
export class AppModule {}
