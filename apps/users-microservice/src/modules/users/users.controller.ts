import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";

import { NATS_MESSAGES } from "@app/api-core";
import { CreateUserDTO, UserRow } from "@app/validators";

import { UsersService } from "./users.service";

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern({ cmd: NATS_MESSAGES.USERS.CREATE })
  createUser(createUserDTO: CreateUserDTO): Promise<UserRow> {
    return this.usersService.createUser(createUserDTO);
  }

  @MessagePattern({ cmd: NATS_MESSAGES.USERS.GET_BY_EMAIL })
  getUserByEmail(email: string): Promise<UserRow | undefined> {
    return this.usersService.getUserByEmail(email);
  }
}
