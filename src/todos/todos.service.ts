import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTodo } from './dtos/create-todo.dto';
import { UpdateTodo } from './dtos/update-todo.dto';
import { TodoDocument, Todo } from './schemas/todos.schema';

@Injectable()
export class TodosService {

    constructor(@InjectModel(Todo.name) private readonly todoModels: Model<TodoDocument> ) {}

    async createTodo(todo: CreateTodo): Promise<Todo> {
        const newTodo = new this.todoModels(todo)
        return await newTodo.save()
    }

    async findTodos(task ?: string): Promise<Todo[]> {
        let findedTask : any
        if( task ) {
            findedTask = await this.todoModels.find({task})
            return findedTask
        }
        findedTask = await this.todoModels.find({})
        return findedTask
    }

    async findById(id: string): Promise<Todo> {
        let findedTask: any
        findedTask = await this.todoModels.findById({ _id: id })
        return findedTask
    }

    async updateTodo(id: string, body: UpdateTodo): Promise<Todo> {
        let updatedTask: any
        let checkTodo = await this.todoModels.findOne({ _id: id })
        if( checkTodo ) {
            updatedTask = await this.todoModels.findByIdAndUpdate(id, body)
            return updatedTask
        }
        const newTodo = new this.todoModels(body)
        updatedTask = await newTodo.save()
        return updatedTask
    }

    async updateTodos(task: string, body: UpdateTodo): Promise<Todo[]> {
        let updatedTodos: any
        let checkTodos = await this.todoModels.find({ task })
        if( checkTodos ) await this.todoModels.updateMany({task}, body)
        updatedTodos = await this.todoModels.find({ task })
        return updatedTodos
    }

    async deleteTodo(id: string): Promise<Todo> {
        return await this.todoModels.findByIdAndDelete(id)
    }

    async deleteTodos(task: string): Promise<Todo[]> {
        await this.todoModels.deleteMany({task})
        return []
    }
}
