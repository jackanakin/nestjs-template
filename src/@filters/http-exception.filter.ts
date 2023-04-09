import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

import i18nManager from 'src/@i18n/translate.i18n';
import HttpExceptionObject from './http-exception.object';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private clientLogger = new Logger('4xx');
  private serverLogger = new Logger('5xx');

  catch(httpException: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = httpException.getStatus();

    let message = httpException.message;
    const exceptionResponse = httpException.getResponse();

    if (httpException instanceof BadRequestException) {
      if (
        exceptionResponse &&
        exceptionResponse['message'] &&
        exceptionResponse['message'][0]
      ) {
        message = exceptionResponse['message'][0];
      }
    }

    const exception: HttpExceptionObject = {
      status,
      host: request.headers.host,
      userAgent: request.headers['user-agent'],
      userId: request.user?.id,
      message,
    };

    if (status >= 500) {
      this.serverLogger.error(exception);
    } else if (status >= 400) {
      this.clientLogger.warn(exception);
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      message: i18nManager.getInstance().t(request.user, message),
    });
  }
}
