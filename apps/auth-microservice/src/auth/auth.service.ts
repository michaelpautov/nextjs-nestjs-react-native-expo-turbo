import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";

import { CustomNatsClient, NATS_MESSAGES } from "@app/api-core";
import { CreateUserDTO, UserRow } from "@app/validators";

@Injectable()
export class AuthService {
  constructor(private natsClient: CustomNatsClient) {}

  async signUp(createUserDTO: CreateUserDTO): Promise<UserRow> {
    const { email, password, ...rest } = createUserDTO;

    const hashedPassword = await bcrypt.hash(password, 10);

    return this.natsClient.send(
      { cmd: NATS_MESSAGES.USERS.CREATE },
      { ...rest, email, password: hashedPassword },
    );
  }
}
