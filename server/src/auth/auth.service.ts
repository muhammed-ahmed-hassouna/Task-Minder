import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ErrorMessages } from '../utilities/enums/eunms';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        @InjectModel(User.name) private UserModel: Model<User>,
    ) { }

    static access_token: string;
    async signIn(email: string, password: string): Promise<any> {
        const User = await this.CheckValidUser(email);
        if (!User) {
            throw new HttpException(
                ErrorMessages.InvalidEmailOrPassword,
                HttpStatus.UNAUTHORIZED
            );
        }
        const passwordMatch = await bcrypt.compare(password, User.password);

        if (!passwordMatch || !password) {
            throw new HttpException(
                ErrorMessages.InvalidEmailOrPassword,
                HttpStatus.UNAUTHORIZED
            );
        }

        const payload = {
            UserId: User['_id'],
            role: User.role,
            UserName: User.username,
            email: User.email
        };

        AuthService.access_token = await this.jwtService.signAsync(payload);
        return {
            access_token: AuthService.access_token,
            role: User.role,
        };
    }

    async CheckValidUser(email: string): Promise<User | undefined> {
        return await this.UserModel.findOne({ email }).exec();
    }

}