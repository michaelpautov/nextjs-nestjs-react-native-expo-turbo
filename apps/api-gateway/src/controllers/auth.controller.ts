import { Body, Controller, Post, UsePipes } from "@nestjs/common";

import {
  CustomNatsClient,
  NATS_MESSAGES,
  ZodValidationPipe,
} from "@app/api-core";
import { CreateUserDTO, createUserDtoSchema } from "@app/validators";

@Controller("auth")
export class AuthController {
  constructor(private natsClient: CustomNatsClient) {}

  @Post("signup")
  @UsePipes(new ZodValidationPipe(createUserDtoSchema))
  async signUp(@Body() createUserDTO: CreateUserDTO) {
    await this.natsClient.send(
      { cmd: NATS_MESSAGES.AUTH.SIGN_UP },
      createUserDTO,
    );
  }
}
