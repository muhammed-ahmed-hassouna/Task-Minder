import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";
import { PartialType } from '@nestjs/mapped-types';

export class CreateUserDto {
    @ApiProperty({ description: 'The Username.', example: 'John Doe' })
    @IsString()
    username: string;

    @ApiProperty({ description: 'The email address of the User.', example: 'john@example.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ description: 'The country of the User.', example: 'Palestine' })
    @IsString()
    country: string;

    @ApiProperty({ description: 'The password of the User.', example: 'Password@123' })
    @IsStrongPassword()
    password: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiProperty({ description: 'The username.', example: 'John Doe' })
    username?: string;

    @ApiProperty({ description: 'The email address of the User.', example: 'john@example.com' })
    email?: string;

    @ApiProperty({ description: 'The country of the User.', example: 'Palestine' })
    country?: string;

    @ApiProperty({ description: 'The password of the User.', example: 'Password@123' })
    password?: string;
}

export class SignInDto {
    @ApiProperty({ description: 'The email address of the User.', example: 'john@example.com' })
    @IsNotEmpty()
    @IsString()
    email: string;

    @ApiProperty({ description: 'The password of the User.', example: 'Password@123' })
    @IsNotEmpty()
    @IsString()
    password: string;
}
