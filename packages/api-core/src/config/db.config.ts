import * as process from "node:process";
import { registerAs } from "@nestjs/config";
import { IsInt, IsString, Max, Min } from "class-validator";

import validateConfig from ".././utils/validate-config";
import { DBConfig } from "./db-config.type";

class EnvironmentVariablesValidator {
  @IsString()
  POSTGRES_HOST!: string;

  @IsInt()
  @Min(0)
  @Max(65535)
  POSTGRES_PORT!: number;

  @IsString()
  POSTGRES_USER!: string;

  @IsString()
  POSTGRES_PASSWORD!: string;

  // #DB_NAMES
  @IsString()
  POSTGRES_USER_DATABASE!: string;
}

export default registerAs<DBConfig>("db", () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    POSTGRES_HOST: process.env.POSTGRES_HOST!,
    POSTGRES_PORT: parseInt(process.env.POSTGRES_PORT as string)!,
    POSTGRES_USER: process.env.POSTGRES_USER!,
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD!,

    // #DB_NAMES
    POSTGRES_USER_DATABASE: process.env.POSTGRES_USER_DATABASE!,
  };
});
