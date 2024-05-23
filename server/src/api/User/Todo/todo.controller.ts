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
  Query,
} from '@nestjs/common';
import { TodoService, } from './todo.service';
import { SystemRoles } from '../../../utilities/enums/eunms';
import { CreateTodoDto, UpdateTodoDto } from '../../../utilities/dtos/todo.dto';
import { Todo } from '../../../schemas/todo.schema';
import { ApiTags, ApiSecurity } from '@nestjs/swagger';
import { AuthGuard } from '../../../guards/authentication.guard';
import { AuthorizationGuard } from '../../../guards/authorization.guard';
import { Role } from '../../../utilities/decorators/roles.decorator';
import { CacheInterceptor } from '@nestjs/cache-manager';

@ApiTags("todo")
@ApiSecurity('JWT-auth')
@UseInterceptors(CacheInterceptor)
@Controller('todo')
export class TodoController {
  constructor(
    private readonly todoService: TodoService,
  ) { }

  @Role([SystemRoles.ADMIN, SystemRoles.USER])
  @UseGuards(AuthGuard, AuthorizationGuard)
  @Post('createTodo')
  async create(@Body() createTodoDto: CreateTodoDto, @Req() req): Promise<{ createdTask: Todo, data: Todo[] }> {
    const userId = await req.user.UserId;
    return await this.todoService.create(createTodoDto, userId);
  }

  @Role([SystemRoles.ADMIN, SystemRoles.USER])
  @UseGuards(AuthGuard, AuthorizationGuard)
  @Get('getAllTodosUser')
  async findAll(@Req() req, @Query('page') page?: number, @Query('pageSize') pageSize?: number): Promise<{ todos: Todo[], totalCount: number }> {
    const userId = req.user.UserId;
    const result = await this.todoService.findAll(userId, page, pageSize);
    return result;
  }

  @Role([SystemRoles.ADMIN, SystemRoles.USER])
  @UseGuards(AuthGuard, AuthorizationGuard)
  @Get('getTodoId')
  async findOne(@Req() req): Promise<Todo> {
    const userId = req.user.UserId;
    return await this.todoService.findOne(userId);
  }

  @Patch('updateTodo/:id')
  async update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto): Promise<{ updatedTask: Todo, data: Todo[] }> {
    return await this.todoService.update(id, updateTodoDto);
  }

  @Role([SystemRoles.ADMIN, SystemRoles.USER])
  @UseGuards(AuthGuard, AuthorizationGuard)
  @Delete('deleteTodo/:id')
  async remove(@Param('id') todoId: string): Promise<{ message: string }> {
    return await this.todoService.remove(todoId);
  }
}