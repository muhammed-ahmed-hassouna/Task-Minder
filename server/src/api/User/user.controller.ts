import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  UseInterceptors,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { UserService, } from './user.service';
import { SystemRoles } from '../../utilities/enums/eunms';
import { CreateUserDto, UpdateUserDto } from '../../utilities/dtos/auth/auth.dto';
import { User } from '../../schemas/User.schema';
import { ApiTags, ApiSecurity } from '@nestjs/swagger';
import { AuthGuard } from '../../guards/authentication.guard';
import { AuthorizationGuard } from '../../guards/authorization.guard';
import { Role } from '../../utilities/decorators/roles.decorator';
import { Request, Response } from 'express';
import { CacheInterceptor } from '@nestjs/cache-manager';

@ApiTags("user")
@ApiSecurity('JWT-auth')
@UseInterceptors(CacheInterceptor)
@Controller('user')
export class UserController {
  constructor(
    private readonly UserService: UserService,
  ) { }

  @Post('register')
  async registerUser(@Body() userDto: CreateUserDto, @Res() response: Response): Promise<void> {

    const registerResponse = await this.UserService.registerUser(userDto);

    const { access_token, role } = registerResponse;

    response.cookie('userData', { access_token, role }, { httpOnly: true });

    response.status(HttpStatus.CREATED).send({
      user: registerResponse.user,
      access_token: access_token,
      role: role,
    });

  }

  @Role([SystemRoles.ADMIN])
  @UseGuards(AuthGuard, AuthorizationGuard)
  @Get('getUsers')
  async findAll(): Promise<{ Users: User[] }> {
    return await this.UserService.findAll();
  }

  @Role([SystemRoles.ADMIN, SystemRoles.USER])
  @UseGuards(AuthGuard, AuthorizationGuard)
  @Get('getUserId')
  async findOne(@Req() req): Promise<User | null> {
    const UserId = req.user.UserId;

    const User = await this.UserService.findOne(UserId);
    return User;
  }

  @Role([SystemRoles.ADMIN])
  @UseGuards(AuthGuard, AuthorizationGuard)
  @Patch('updateUser')
  async update(@Req() req, @Body() updateUserDto: UpdateUserDto): Promise<User | null> {
    const UserId = req.user.UserId;

    const updatedUser = await this.UserService.update(UserId, updateUserDto);
    return updatedUser;
  }

  @Role([SystemRoles.ADMIN])
  @UseGuards(AuthGuard, AuthorizationGuard)
  @Delete('delete/:id')
  async remove(@Param('id') id: string): Promise<any> {
    const deleteUser = await this.UserService.remove(id);
    return deleteUser;
  }
}