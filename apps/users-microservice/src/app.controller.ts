import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";

import { NATS_MESSAGES } from "@app/api-core";

@Controller()
export class AppController {
  @MessagePattern({ cmd: NATS_MESSAGES.USERS.GET })
  getHello(): string {
    return "hello";
  }
}
