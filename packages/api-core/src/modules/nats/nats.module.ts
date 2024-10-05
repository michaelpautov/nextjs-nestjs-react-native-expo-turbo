import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ClientsModule, Transport } from "@nestjs/microservices";

import { SERVICE_NAMES } from "../../constants/service-names";
import { APIConfigModule } from "../api-config/api-config.module";

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: SERVICE_NAMES.NATS,
        imports: [APIConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => {
          const natsPort = await configService.get("app.NATS_PORT");
          const natsHost = await configService.get("app.NATS_HOST");
          return {
            transport: Transport.NATS,
            options: {
              servers: [`nats://${natsHost}:${natsPort}`],
            },
          };
        },
      },
    ]),
  ],
  exports: [
    ClientsModule.registerAsync([
      {
        name: SERVICE_NAMES.NATS,
        imports: [APIConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => {
          const natsPort = await configService.get("app.NATS_PORT");
          const natsHost = await configService.get("app.NATS_HOST");
          return {
            transport: Transport.NATS,
            options: {
              servers: [`nats://${natsHost}:${natsPort}`],
            },
          };
        },
      },
    ]),
  ],
})
export class NatsModule {}