import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

import { ExceptionFilter, logger } from "@app/api-core";

import { AppModule } from "./app.module";

async function bootstrap() {
  try {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
      AppModule,
      {
        transport: Transport.NATS,
        options: (configService: ConfigService) => ({
          servers: [
            `nats://${configService.get("app.NATS_HOST")}:${configService.get("app.NATS_PORT")}`,
          ],
        }),
      },
    );

    await app.listen();
    logger.info(`User Microservice is listening`);

    const configService = app.get(ConfigService);
    logger.info(
      `Connected to NATS server at ${configService.get("app.NATS_HOST")}:${configService.get("app.NATS_PORT")}`,
    );
  } catch (error) {
    logger.error(`Failed to start microservice`, error);
    process.exit(1);
  }
}

bootstrap();
