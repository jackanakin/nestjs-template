import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  RequestTimeoutException,
  Logger,
} from '@nestjs/common';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  private logger = new Logger('TIMEOUT');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      timeout(15000),
      catchError((err) => {
        if (err instanceof TimeoutError) {
          const ctx = context.switchToHttp();
          const request = ctx.getRequest();

          this.logger.error(
            request.headers['host'],
            request.headers['user-agent'],
            request.user?.id,
          );

          return throwError(() => new RequestTimeoutException());
        }
        return throwError(() => err);
      }),
    );
  }
}
