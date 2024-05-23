import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ErrorMessages } from '../../../utilities/enums/eunms';
import { Todo } from 'src/schemas';
import { CreateTodoDto, UpdateTodoDto } from 'src/utilities/dtos/todo.dto';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private readonly todoModel: Model<Todo>) { }

  async create(createTodoDto: CreateTodoDto, userId: string): Promise<{ createdTask: Todo, data: Todo[] }> {
    try {
      const createdTask = await new this.todoModel({
        userId: userId,
        ...createTodoDto
      }).save();

      const savedTask = await createdTask.save();

      return savedTask.toObject();
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

  async findAll(userId: string, page: number = 1, pageSize: number = 10): Promise<{ todos: Todo[], totalCount: number }> {
    try {
      const skip = (page - 1) * pageSize;
      let query = { userId };

      const todos = await this.todoModel.find(query)
        .populate({
          path: 'userId',
          select: '-password -__v -createdAt -role',
        })
        .skip(skip)
        .limit(pageSize)
        .lean()
        .exec();

      const totalCount = await this.todoModel.countDocuments(query);

      return { totalCount, todos };
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

  async findOne(userId: string): Promise<Todo> {
    try {
      const todo = await this.todoModel.findOne({ userId }).populate({
        path: 'userId',
        select: '-password -__v -createdAt -role',
      }).lean().exec();

      if (!todo) {
        throw new HttpException(ErrorMessages.EmailAlreadyExists, HttpStatus.CONFLICT);
      }

      return todo;
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

  async update(id: string, updateTodoDto: UpdateTodoDto): Promise<{ updatedTask: Todo, data: Todo[] }> {
    try {
      const updatedTask = await this.todoModel
        .findByIdAndUpdate(id, updateTodoDto, { new: true })
        .exec();

      if (!updatedTask) {
        throw new HttpException(ErrorMessages.TodoNotFound, HttpStatus.NOT_FOUND);
      }

      const allTodos = await this.todoModel.find().exec();

      return {
        updatedTask: updatedTask,
        data: allTodos
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

  async remove(todoId: string): Promise<{ message: string, data: Todo[] }> {
    try {
      const deletedTodo = await this.todoModel.findByIdAndDelete(todoId).exec();
      const Todo = await this.todoModel.find().exec();

      if (!deletedTodo) {
        throw new HttpException(ErrorMessages.TodoNotFound, HttpStatus.NOT_FOUND);
      }

      return {
        message: 'Todo Deleted !',
        data: Todo
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
}