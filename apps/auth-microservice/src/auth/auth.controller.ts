import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";

import { EmailAlreadyExistsException, NATS_MESSAGES } from "@app/api-core";
import { CreateUserDTO, UserRow } from "@app/validators";

import { AuthService } from "./auth.service";

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: NATS_MESSAGES.AUTH.SIGN_UP })
  signUp(
    createUserDTO: CreateUserDTO,
  ): Promise<UserRow | EmailAlreadyExistsException> {
    return this.authService.signUp(createUserDTO);
  }
}
