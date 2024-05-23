import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from '../../guards/authentication.guard';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';
import { envKeys } from 'src/utilities/enums/eunms';

@Module({
  imports: [
    // Mongoose Schemas
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      }
    ]),

    // Jwt Config
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>(envKeys.JWT_SECRET_KEY),
      }),
      inject: [ConfigService],
      global: true,
    }),
    JwtModule
  ],

  controllers: [UserController],
  providers: [AuthGuard, UserService],
  exports: [UserService]
})
export class UserModule { }
