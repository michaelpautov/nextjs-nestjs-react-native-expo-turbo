import * as process from "node:process";
import { registerAs } from "@nestjs/config";
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from "class-validator";

import validateConfig from "../../utils/validate-config";
import { AppConfig } from "./app-config.type";

enum Environment {
  Development = "development",
  Production = "production",
  Test = "test",
}

class EnvironmentVariablesValidator {
  // #ENV
  @IsEnum(Environment)
  @IsOptional()
  NODE_ENV!: Environment;

  // #API
  @IsString()
  API_PROTOCOL!: string;

  @IsString()
  API_HOST!: string;

  @IsInt()
  @Min(0)
  @Max(65535)
  API_PORT!: number;

  @IsString()
  API_PREFIX!: string;

  @IsString()
  JWT_SECRET_KEY!: string;

  @IsString()
  API_SECRET_KEY!: string;

  // #REDIS
  @IsInt()
  @Min(0)
  @Max(65535)
  REDIS_PORT!: number;

  @IsString()
  REDIS_HOST!: string;

  // #NATS
  @IsInt()
  @Min(0)
  @Max(65535)
  NATS_PORT!: number;

  @IsString()
  NATS_HOST!: string;
}

export default registerAs<AppConfig>("app", () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    // #ENV
    NODE_ENV: process.env.NODE_ENV!,
    // #API
    API_PROTOCOL: process.env.API_PROTOCOL!,
    API_HOST: process.env.API_HOST!,
    API_PORT: parseInt(process.env.API_PORT as string)!,
    API_PREFIX: process.env.API_PREFIX!,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY!,
    API_SECRET_KEY: process.env.API_SECRET_KEY!,
    // #REDIS
    REDIS_HOST: process.env.REDIS_HOST!,
    REDIS_PORT: parseInt(process.env.REDIS_PORT as string)!,
    // NATS
    NATS_PORT: parseInt(process.env.NATS_PORT as string)!,
    NATS_HOST: process.env.NATS_HOST!,
    // APP
    WORKING_DIRECTORY: process.env.PWD || process.cwd(),
    APP_NAME: "test",
    FRONTEND_DOMAIN: "test",
    BACKEND_DOMAIN: "test",
  };
});
