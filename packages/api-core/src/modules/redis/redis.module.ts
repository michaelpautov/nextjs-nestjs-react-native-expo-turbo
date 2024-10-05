import { CacheModule } from "@nestjs/cache-manager";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import * as redisStore from "cache-manager-redis-store";

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService): Promise<unknown> => ({
        store: redisStore,
        host: configService.get("app.REDIS_HOST"),
        port: configService.get("app.REDIS_PORT"),
        ttl: 300,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class RedisModule {}
