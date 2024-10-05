import { Module } from "@nestjs/common";

import { APIConfigModule } from "./modules/api-config/api-config.module";

@Module({
  imports: [APIConfigModule],
  controllers: [],
})
export class APICoreModule {}
