import { Module } from "@nestjs/common";

import {
  APICoreModule,
  DATABASE_CONNECTION,
  DatabaseModule,
} from "@app/api-core";

import { UsersModule } from "./modules/users/users.module";
import { usersMicroserviceSchema } from "./schema";

@Module({
  imports: [
    APICoreModule,
    DatabaseModule.forRootAsync({
      dbName: "USER",
      connectionName: DATABASE_CONNECTION.USERS_DATABASE_CONNECTION,
      schema: usersMicroserviceSchema,
    }),
    UsersModule,
  ],
})
export class AppModule {}
