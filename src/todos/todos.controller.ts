import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOkResponse, ApiQuery, ApiBadRequestResponse } from '@nestjs/swagger';
import { CreateTodo } from './dtos/create-todo.dto';
import { UpdateTodo } from './dtos/update-todo.dto';
import { Todo } from './schemas/todos.schema';
import { TodosService } from './todos.service';

@ApiTags('todos')
@Controller('todos')
export class TodosController {

    constructor( private todosService: TodosService ) {}
    
    @ApiOkResponse({type: Todo, isArray: true})
    @ApiQuery({name: 'task', required: false})
    @Get()
    getTodos(@Query('task') task ?: string): Promise<Todo[]> {
        let todos = this.todosService.findTodos(task)
        if( !todos ) throw new BadRequestException()    // kenapa throw error ga jalan?
        return todos
    }

    @ApiOkResponse({ type: Todo })
    @Get(':id')
    getTodosById(@Param('id') id: string): Promise<Todo> {
        let todos = this.todosService.findById(id)
        if( !todos ) throw new BadRequestException()    // kenapa throw error ga jalan?
        return todos
    }

    @ApiBadRequestResponse()
    @ApiCreatedResponse({ type: Todo })
    @Post()
    addTodo(@Body() body : CreateTodo): Promise<Todo> {
        return this.todosService.createTodo(body)
    }

    @ApiBadRequestResponse()
    @Put(':id')
    updateTodo(@Param('id') id:string, @Body() body: UpdateTodo ): Promise<Todo> {
        if( !id.match(/^[0-9a-fA-F]{24}$/) ) throw new BadRequestException()
        if( typeof id != 'string' ) throw new BadRequestException()
        return this.todosService.updateTodo(id, body)
    }

    @ApiBadRequestResponse()
    @Put()
    updateTodos(@Query('task') task:string, @Body() body: UpdateTodo ): Promise<Todo[]> {
        return this.todosService.updateTodos(task, body)
    }

    @ApiOkResponse({ type: Todo })
    @Delete(':id')
    deleteTodo(@Param('id') id:string): Promise<Todo> {
        return this.todosService.deleteTodo(id)
    }

    @ApiOkResponse({ type: Todo })
    @Delete()
    deleteTodos(@Query('task') task:string): Promise<Todo[]> {
        return this.todosService.deleteTodos(task)
    }
}
