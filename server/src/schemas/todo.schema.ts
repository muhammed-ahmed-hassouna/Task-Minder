import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose from "mongoose";
import { User } from './user.schema';
import { TodoPriority, TodoStatus } from '../utilities/enums/eunms';

export interface TodoInterface {
    userId: mongoose.Types.ObjectId | User;
    subject: string;
    task: string;
    priority: TodoPriority;
    status: TodoStatus;
    createdAt: Date;
}

@Schema()
export class Todo extends Document implements TodoInterface {
    @Prop({ type: mongoose.Types.ObjectId, ref: 'User', required: true })
    userId: mongoose.Types.ObjectId;

    @Prop({ type: String, required: true })
    subject: string;

    @Prop({ type: String, required: true })
    task: string;

    @Prop({ type: String, enum: Object.values(TodoPriority)})
    priority: TodoPriority;

    @Prop({ type: String, enum: Object.values(TodoStatus), required: true })
    status: TodoStatus;

    @Prop({ default: Date.now })
    createdAt: Date;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);