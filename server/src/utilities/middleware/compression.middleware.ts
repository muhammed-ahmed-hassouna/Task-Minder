import * as compression from 'compression';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

// decrease the size of the response body that is being sent over the network
@Injectable()
export class CompressionMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        compression()(req, res, next);
    }
}
