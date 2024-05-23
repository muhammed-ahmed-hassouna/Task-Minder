import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, ForbiddenException, HttpException, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from 'src/api/User/user.service';
import { ROLE_KEY } from '../utilities/decorators/roles.decorator';
import { ErrorMessages } from '../utilities/enums/eunms';

@Injectable()
export class AuthorizationGuard implements CanActivate {
    constructor(
        private reflect: Reflector,
        private UserService: UserService,
    ) { }

    async canActivate(context: ExecutionContext,): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const requiredRoles = this.reflect.get<number[]>(ROLE_KEY, context.getHandler());
        
        const User = request.user;
        if (!User || !User.UserId) {
            throw new UnauthorizedException();
        }
        const UserRole = await this.UserService.getUserRole(User.UserId);
        
        if (!UserRole || !requiredRoles.includes(UserRole)) {
            throw new HttpException(ErrorMessages.ForbiddenException, HttpStatus.FORBIDDEN);
        }
        return true;
    }
}