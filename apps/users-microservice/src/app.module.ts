import { Module } from "@nestjs/common";

import {
  APICoreModule,
  DATABASE_CONNECTION,
  DatabaseModule,
} from "@app/api-core";

import { AppController } from "./app.controller";
import { users } from "./schema/users";

@Module({
  imports: [
    APICoreModule,
    DatabaseModule.forRootAsync({
      dbName: "USER",
      connectionName: DATABASE_CONNECTION.USERS_DATABASE_CONNECTION,
      schema: { users },
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
