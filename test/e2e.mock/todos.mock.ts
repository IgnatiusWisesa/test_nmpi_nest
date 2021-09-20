import { Controller, Get } from "@nestjs/common"

export const todos = [{ id:"1", task: "mopping" }]
export const todo = { id:"string", task: "mopping" }

export const MockTodo = {
    find: jest.fn().mockResolvedValue(todos),
    create: 
        jest.fn().mockResolvedValue((dto) => {
        return { id: 'string', dto }
    })
}

@Controller('todos')
export class TodosControllerMock {
    @Get() 
    public find(task){
        if( !task ) task = 'string'
        return [{
            id: 'string',
            task
        }] 
    }
}