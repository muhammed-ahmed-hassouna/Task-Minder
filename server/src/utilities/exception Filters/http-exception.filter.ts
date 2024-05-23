import { Catch, ExceptionFilter, ArgumentsHost, HttpException, Logger, Injectable, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { dirname, join } from 'path';

@Catch(HttpException)
@Injectable()
export class HttpExceptionFilter implements ExceptionFilter {
    constructor(private logger: Logger) { }
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest();
        const status = exception.getStatus();

        const isApiRequest = request.url.startsWith('/api');
        if (isApiRequest) {
            this.logger.error(`${request.method} ${request.originalUrl} ${status} error: ${exception.message}`);
            const errorDetails = exception.getResponse();
            return response.status(status).json({ error: true, errorDetails });
        }
    }
}
