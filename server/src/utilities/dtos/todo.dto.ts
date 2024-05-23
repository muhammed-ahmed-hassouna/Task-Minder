import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsDateString, IsDate, IsEnum } from 'class-validator';
import { TodoPriority, TodoStatus } from '../enums/eunms';
export class CreateTodoDto {
    @ApiProperty({
        description: 'Subject',
        example: 'Homework',
    })
    @IsString()
    @IsNotEmpty()
    subject: string;

    @ApiProperty({
        description: 'Task description',
        example: 'Finish homework',
    })
    @IsString()
    @IsNotEmpty()
    task: string;

    @ApiProperty({
        description: 'Priority of the task',
        enum: TodoPriority,
        enumName: 'TodoPriority',
        example: TodoPriority.High,
    })
    @IsEnum(TodoPriority)
    priority: TodoPriority;

    @ApiProperty({
        description: 'Status of the task',
        enum: TodoStatus,
        enumName: 'TodoStatus',
        example: TodoStatus.IN_PROGRESS,
    })
    @IsEnum(TodoStatus)
    status: TodoStatus;
}

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
    @ApiProperty({
        description: 'Subject',
        example: 'Homework',
    })
    @IsString()
    @IsOptional()
    subject?: string;

    @ApiProperty({
        description: 'Task description',
        example: 'Finish homework',
    })
    task?: string;

    @ApiProperty({
        description: 'Priority of the task',
        enum: TodoPriority,
        enumName: 'TodoPriority',
        example: TodoPriority.High,
        required: false,
    })
    @IsOptional()
    @IsEnum(TodoPriority)
    priority?: TodoPriority;

    @ApiProperty({
        description: 'Status of the task',
        enum: TodoStatus,
        enumName: 'TodoStatus',
        example: TodoStatus.IN_PROGRESS,
        required: false,
    })
    @IsOptional()
    @IsEnum(TodoStatus)
    status?: TodoStatus;
}