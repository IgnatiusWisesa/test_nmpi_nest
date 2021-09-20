import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createTodo } from './dtos/create-todo.dto';
import { updateTodo } from './dtos/update-todo.dto';
import { TodoDocument, Todo } from './schemas/todos.schema';

@Injectable()
export class TodosService {

    constructor(@InjectModel(Todo.name) private readonly todoModels: Model<TodoDocument> ) {}

    async createTodo(todo: createTodo): Promise<Todo> {
        const newTodo = new this.todoModels(todo)
        return await newTodo.save()
    }

    async findTodos(task ?: string): Promise<Todo[]> {
        if( task ) return await this.todoModels.find({task})
        return await this.todoModels.find({})
    }

    async findById(id: string): Promise<Todo> {
        return await this.todoModels.findById({ _id: id })
    }

    async updateTodo(id: string, body: updateTodo): Promise<Todo> {
        let checkTodo = await this.todoModels.findOne({ _id: id })
        if( checkTodo ) return await this.todoModels.findByIdAndUpdate(id, body)
        const newTodo = new this.todoModels(body)
        return await newTodo.save()
    }

    async updateTodos(task: string, body: updateTodo): Promise<Todo[]> {
        let checkTodos = await this.todoModels.find({ task })
        if( checkTodos ) await this.todoModels.updateMany({task}, body) 
        return await this.todoModels.find({ task })

        // return await this.todoModels.updateMany({task}, body) 
    }

    async deleteTodo(id: string): Promise<Todo> {
        return await this.todoModels.findByIdAndDelete(id)
    }

    async deleteTodos(task: string): Promise<Todo[]> {
        await this.todoModels.deleteMany({task})
        return []
    }
}
