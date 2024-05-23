import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../../schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, UpdateUserDto } from '../../utilities/dtos/auth/auth.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ErrorMessages } from '../../utilities/enums/eunms';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private readonly UserModel: Model<User>,) { }
  static access_token: string;
  async registerUser(UserDto: CreateUserDto): Promise<{ user: User, access_token: string, role: number }> {
    try {
      const existingUser = await this.UserModel.findOne({ email: UserDto.email });
      if (existingUser) {
        throw new HttpException(ErrorMessages.EmailAlreadyExists, HttpStatus.CONFLICT);
      }
      const hashedPassword = await bcrypt.hash(UserDto.password, 10);


      const newUser = new this.UserModel({
        ...UserDto,
        password: hashedPassword,
      });
      const savedUser = await newUser.save();

      const payload = {
        UserId: savedUser._id,
        role: savedUser.role,
        UserName: savedUser.username,
        email: savedUser.email,
      };      
      AuthService.access_token = await this.jwtService.signAsync(payload);

      return {
        user: savedUser.toObject(),
        access_token: AuthService.access_token,
        role: savedUser.role
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        console.log(error);

        throw new HttpException(
          ErrorMessages.internalServerError,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
  async findAll(): Promise<{ count: number; Users: User[] }> {
    const Users = await this.UserModel.find().lean().exec();
    const count = Users.length;
    return { count, Users };
  }

  async findOne(UserId: string): Promise<User> {
    const User = await this.UserModel.findById(UserId).lean().exec();
    if (!User) {
      throw new HttpException(ErrorMessages.UserNotFound, HttpStatus.NOT_FOUND);
    }
    return User;
  }

  async update(UserId: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      if (updateUserDto.password) {
        const hashedPassword = await bcrypt.hash(updateUserDto.password, 10);
        updateUserDto.password = hashedPassword;
      }
      const updatedUser = await this.UserModel.findByIdAndUpdate(UserId, updateUserDto, { new: true }).exec();
      if (!updatedUser) {
        throw new HttpException(ErrorMessages.UserNotFound, HttpStatus.NOT_FOUND);
      }
      return updatedUser;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException(
          ErrorMessages.internalServerError,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async remove(id: string): Promise<any> {
    const deletedUser = await this.UserModel.findByIdAndDelete(id).exec();
    if (!deletedUser) {
      throw new HttpException(ErrorMessages.UserNotFound, HttpStatus.NOT_FOUND);
    }
    return deletedUser;
  }


  async getUserRole(UserID: string): Promise<any> {
    try {
      const User = await this.UserModel.findById(UserID);
      if (!User) {
        throw new HttpException(ErrorMessages.UserNotFound, HttpStatus.NOT_FOUND);
      }
      return User ? User.role : null;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException(
          ErrorMessages.internalServerError,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
