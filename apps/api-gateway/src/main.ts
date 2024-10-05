import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";

import { AllConfigType, logger } from "@app/api-core";

import { AppModule } from "./app.module";

async function bootstrap() {
  const fastifyAdapter = new FastifyAdapter({ logger });
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fastifyAdapter,
  );
  const configService = app.get(ConfigService<AllConfigType>);

  app.setGlobalPrefix(
    configService.getOrThrow("app.API_PREFIX", { infer: true }),
    {
      exclude: ["/"],
    },
  );

  await app.listen(
    configService.getOrThrow("app.API_PORT", { infer: true }),
    configService.getOrThrow("app.API_HOST", { infer: true }),
    async () => {
      logger.info(
        `ENV: ${configService.getOrThrow("app.NODE_ENV", { infer: true })}`,
        configService.getOrThrow("app.NODE_ENV", { infer: true }),
      );

      logger.info(`Server is up.`);
    },
  );
}
bootstrap();
