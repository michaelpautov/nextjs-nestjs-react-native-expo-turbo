import { Catch, HttpStatus, RpcExceptionFilter } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { Observable, throwError } from "rxjs";

@Catch(RpcException)
export class ExceptionFilter implements RpcExceptionFilter<RpcException> {
  catch(exception: RpcException): Observable<any> {
    const error = exception.getError() as any;
    const formattedError = {
      isRpcException: true,
      statusCode: error?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      status: error?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      message: error.message || "RpcException",
    };
    return throwError(() => formattedError);
  }
}
