import { Module } from "@nestjs/common";

import { APICoreModule } from "@app/api-core";

import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [APICoreModule, AuthModule],
})
export class AppModule {}
