import { Controller, Get, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

import { NATS_MESSAGES, SERVICE_NAMES } from "@app/api-core";

@Controller("users")
export class AppController {
  constructor(@Inject(SERVICE_NAMES.NATS) private natsClient: ClientProxy) {}

  @Get()
  getHello() {
    return this.natsClient.send({ cmd: NATS_MESSAGES.USERS.GET }, {});
  }
}
