import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ErrorMessages } from '../utilities/enums/eunms'; 

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;

        if (!authHeader) {
            throw new HttpException(ErrorMessages.UnauthorizedApiKey, HttpStatus.UNAUTHORIZED);
        }

        const parts = authHeader.split(' ');
        if (parts.length !== 2 || parts[0] !== 'Bearer') {
            throw new HttpException(ErrorMessages.UnauthorizedApiKey, HttpStatus.UNAUTHORIZED);
        }

        const token = parts[1];
        try {
            const payload = this.jwtService.verify(token);
            request.user = payload;
            return true;
        } catch (error) {
            console.log(error);
            throw new UnauthorizedException();
        }
    }
}
