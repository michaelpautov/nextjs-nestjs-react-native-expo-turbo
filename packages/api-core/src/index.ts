import { Module } from "@nestjs/common";

import { DATABASE_CONNECTION } from "./constants/database-connection";
import { NATS_MESSAGES } from "./constants/nats-messages";
import { SERVICE_NAMES } from "./constants/service-names";
import { EmailAlreadyExistsException } from "./error-exceptions/email-already-exist";
import {
  AllConfigType,
  APIConfigModule,
} from "./modules/api-config/api-config.module";
import { DatabaseModule } from "./modules/database/database.module";
import { MailerModule } from "./modules/mailer/mailer.module";
import { CustomNatsClient } from "./modules/nats/custom-nats.client";
import { NatsModule } from "./modules/nats/nats.module";
import { RedisModule } from "./modules/redis/redis.module";
import { ZodValidationPipe } from "./pipes/zod-validation.pipe";
import { logger } from "./utils/logger";

@Module({
  imports: [APIConfigModule, NatsModule, RedisModule, MailerModule],
  controllers: [],
  providers: [CustomNatsClient],
  exports: [NatsModule, RedisModule, CustomNatsClient],
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
  ZodValidationPipe,
  CustomNatsClient,
  NatsModule,
  EmailAlreadyExistsException,
};
