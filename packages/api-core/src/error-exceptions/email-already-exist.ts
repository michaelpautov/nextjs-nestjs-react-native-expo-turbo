import { HttpStatus } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";

export class EmailAlreadyExistsException extends RpcException {
  constructor() {
    super({
      status: HttpStatus.UNPROCESSABLE_ENTITY,
      message: "email-already-exist",
    });
  }
}
