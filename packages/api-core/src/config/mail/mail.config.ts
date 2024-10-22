import { registerAs } from "@nestjs/config";
import {
  IsBoolean,
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
} from "class-validator";

import validateConfig from "../../utils/validate-config";
import { MailConfig } from "./mail-config.type";

class EnvironmentVariablesValidator {
  @IsInt()
  @Min(0)
  @Max(65535)
  @IsOptional()
  MAIL_PORT!: number;

  @IsString()
  MAIL_HOST!: string;

  @IsString()
  @IsOptional()
  MAIL_USER!: string;

  @IsString()
  @IsOptional()
  MAIL_PASSWORD!: string;

  @IsEmail()
  MAIL_DEFAULT_EMAIL!: string;

  @IsString()
  MAIL_DEFAULT_NAME!: string;

  @IsBoolean()
  MAIL_IGNORE_TLS!: boolean;

  @IsBoolean()
  MAIL_SECURE!: boolean;

  @IsBoolean()
  MAIL_REQUIRE_TLS!: boolean;
}

export default registerAs<MailConfig>("mail", () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    MAIL_PORT: process.env.MAIL_PORT
      ? parseInt(process.env.MAIL_PORT, 10)
      : 587,
    MAIL_HOST: process.env.MAIL_HOST!,
    MAIL_USER: process.env.MAIL_USER!,
    MAIL_PASSWORD: process.env.MAIL_PASSWORD!,
    MAIL_DEFAULT_EMAIL: process.env.MAIL_DEFAULT_EMAIL!,
    MAIL_DEFAULT_NAME: process.env.MAIL_DEFAULT_NAME!,
    MAIL_IGNORE_TLS: process.env.MAIL_IGNORE_TLS === "true"!,
    MAIL_SECURE: process.env.MAIL_SECURE === "true"!,
    MAIL_REQUIRE_TLS: process.env.MAIL_REQUIRE_TLS === "true"!,
  };
});
