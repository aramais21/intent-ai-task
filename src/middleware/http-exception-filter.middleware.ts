import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    let { message } = exception;
    const exceptionResponse = exception.getResponse();
    if (exceptionResponse) {
      if (exceptionResponse instanceof Object) {
                message = Array.isArray(exceptionResponse['message']) // eslint-disable-line
                    ? exceptionResponse['message'][0] // eslint-disable-line
                    : exceptionResponse['message']; // eslint-disable-line
      } else {
        message = exceptionResponse;
      }
    }

    response.status(status).json({
      success: false,
      message,
    });
  }
}
