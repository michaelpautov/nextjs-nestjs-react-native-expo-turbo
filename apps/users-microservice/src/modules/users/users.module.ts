import { Module } from "@nestjs/common";

import { NatsModule } from "@app/api-core";

import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

@Module({
  imports: [NatsModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
