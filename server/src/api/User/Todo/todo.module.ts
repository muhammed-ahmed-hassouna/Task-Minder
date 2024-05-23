import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoService } from './todo.service';
import { Todo, TodoSchema } from 'src/schemas';
import { UserModule } from '../user.module';

@Module({
  imports: [
    // Mongoose Schemas
    MongooseModule.forFeature([
      {
        name: Todo.name,
        schema: TodoSchema,
      }
    ]),
    UserModule
  ],

  controllers: [TodoController],
  providers: [TodoService],
  exports: [TodoService]
})
export class TodoModule { }
