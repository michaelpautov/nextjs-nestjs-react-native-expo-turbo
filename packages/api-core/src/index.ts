import { Module } from "@nestjs/common";

import { DATABASE_CONNECTION } from "./constants/database-connection";
import { NATS_MESSAGES } from "./constants/nats-messages";
import { SERVICE_NAMES } from "./constants/service-names";
import {
  AllConfigType,
  APIConfigModule,
} from "./modules/api-config/api-config.module";
import { DatabaseModule } from "./modules/database/database.module";
import { NatsModule } from "./modules/nats/nats.module";
import { RedisModule } from "./modules/redis/redis.module";
import { logger } from "./utils/logger";

@Module({
  imports: [APIConfigModule, NatsModule, RedisModule],
  controllers: [],
  exports: [NatsModule, RedisModule],
})
export class APICoreModule {}

export {
  APIConfigModule,
  logger,
  AllConfigType,
  NATS_MESSAGES,
  SERVICE_NAMES,
  DatabaseModule,
  DATABASE_CONNECTION,
};
