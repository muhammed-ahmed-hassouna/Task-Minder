import { Body, Controller, Post, HttpCode, HttpStatus, Res, UseInterceptors } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SignInDto } from '../utilities/dtos/auth/auth.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';

@ApiTags("auth")
@ApiBearerAuth('JWT')
@UseInterceptors(CacheInterceptor)
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async signIn(@Body() signInDto: SignInDto, @Res() response: Response) {
        const signInResponse = await this.authService.signIn(
            signInDto.email,
            signInDto.password,
        );
        const { access_token, role } = signInResponse;

        response.cookie('userData', { access_token, role }, { httpOnly: true });

        return response.send(signInResponse);
    }
}
