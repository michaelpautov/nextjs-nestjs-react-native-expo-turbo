import { Module } from "@nestjs/common";

import {
  AllConfigType,
  APIConfigModule,
} from "./modules/api-config/api-config.module";
import { NatsModule } from "./modules/nats/nats.module";
import { RedisModule } from "./modules/redis/redis.module";
import { logger } from "./utils/logger";

@Module({
  imports: [APIConfigModule, NatsModule, RedisModule],
  controllers: [],
})
export class APICoreModule {}

export { APIConfigModule, logger, AllConfigType };
