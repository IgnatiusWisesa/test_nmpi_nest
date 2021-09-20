import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger'

export type TodoDocument = Todo & Document;

@Schema()
export class Todo {
  @Prop()
  @ApiProperty()
  task: string;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);