

| Have |  |
| ------------- | ------------- |
| Bearer Token  | User registration/authentication/[authorization](https://github.com/jackanakin/nestjs-template/blob/main/src/authentication/config/jwt.strategy.ts) and @UseGuards(AuthGuard())  |
| Swagger | API documentation with [Swagger](https://github.com/jackanakin/nestjs-template/blob/main/src/%40config/swagger/swagger.config.ts) |
| Typeorm | PostgreSQL database [config](https://github.com/jackanakin/nestjs-template/blob/main/src/app.module.ts) |
| i18next | Internacionalization with [i18next](https://github.com/jackanakin/nestjs-template/blob/main/src/%40i18n/translate.i18n.ts) |
| Throttler | Rate limiter for [config](https://github.com/jackanakin/nestjs-template/blob/main/src/app.module.ts) |
| Request Logging | ${method} ${statusCode} ${url} ${contentLength} - ${userAgent} ${ip}:${remotePort} - userId:${request.user?.id} [logging](https://github.com/jackanakin/nestjs-template/blob/main/src/%40middleware/logging.middleware.ts) |
| Exception handler | Using NestJS @Catch(HttpException) and ExceptionFilter to catch [errors](https://github.com/jackanakin/nestjs-template/blob/main/src/%40filters/http-exception.filter.ts) |

| To do |  |
| ------------- | ------------- |
| Pagination, filtering, ordering | |
| Telemetry, Monitoring | |
| WebSocket | |
| oAuth | |
| file upload/download | |
| Docker | |
