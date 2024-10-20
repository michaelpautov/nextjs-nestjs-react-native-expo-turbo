import { Module } from "@nestjs/common";

import { APICoreModule } from "@app/api-core";

import { AuthController } from "./controllers/auth.controller";

@Module({
  imports: [APICoreModule],
  controllers: [AuthController],
})
export class AppModule {}
