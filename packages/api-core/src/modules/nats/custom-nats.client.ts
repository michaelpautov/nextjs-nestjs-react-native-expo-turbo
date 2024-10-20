import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { catchError, firstValueFrom } from "rxjs";

import { SERVICE_NAMES } from "../../constants/service-names";

@Injectable()
export class CustomNatsClient {
  constructor(@Inject(SERVICE_NAMES.NATS) private natsClient: ClientProxy) {}

  async send<TResult = any, TInput = any>(
    pattern: any,
    data: TInput,
  ): Promise<TResult> {
    return firstValueFrom(
      this.natsClient.send<TResult, TInput>(pattern, data).pipe(
        catchError((error) => {
          if (error instanceof RpcException) {
            throw error;
          }
          throw new RpcException(error.message || "Unknown error occurred");
        }),
      ),
    );
  }

  async emit<TResult = any, TInput = any>(
    pattern: any,
    data: TInput,
  ): Promise<void> {
    await firstValueFrom(
      this.natsClient.emit<TResult, TInput>(pattern, data).pipe(
        catchError((error) => {
          console.error("Error in NATS emit:", error);
          throw error;
        }),
      ),
    );
  }
}
