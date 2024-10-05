import { Module } from "@nestjs/common";

import { APICoreModule } from "@app/api-core";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [APICoreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
