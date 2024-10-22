import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from "@nestjs/common";
import { FastifyReply } from "fastify";

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const reply = ctx.getResponse<FastifyReply>();

    const status = exception.error?.status ?? HttpStatus.INTERNAL_SERVER_ERROR;

    const message = exception.message ?? "Internal server error";

    const responseBody = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      message,
    };

    return reply.status(status).send(responseBody);
  }
}
