import { Module } from "@nestjs/common";

import {
  AllConfigType,
  APIConfigModule,
} from "./modules/api-config/api-config.module";
import { logger } from "./utils/logger";

@Module({
  imports: [APIConfigModule],
  controllers: [],
})
export class APICoreModule {}

export { APIConfigModule, logger, AllConfigType };
