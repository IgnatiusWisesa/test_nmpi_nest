import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Todo } from './schemas/todos.schema';
import { TodosService } from './todos.service';
import { MockTodosService } from './mocks/todos-service.mock'

describe('TodosService', () => {
  let service: TodosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodosService, {
        provide: getModelToken(Todo.name),
        useValue: MockTodosService,
      }],
    })
      .overrideProvider(TodosService)
      .useValue(MockTodosService)
      .compile();

    service = module.get<TodosService>(TodosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it(`should saves a task`, async () => {
    expect(await service.createTodo({ task: 'eating' })).toEqual({ id: 'string', task: 'eating' })
  })

  it(`should find todos`, async () => {
    expect(await service.findTodos('sleeping')).toEqual([{ id: 'string', task: 'sleeping' }])
  })

  it(`should find by id`, async () => {
    expect(await service.findById('string')).toEqual({ id: 'string', task: 'string' })
  })

  it(`should update a todo`, async () => {
    expect(await service.updateTodo("string", {task: 'mopping'})).toEqual({ id: "string", task: 'mopping' })
  })

  it(`should delete a todo`, async () => {
    expect(await service.deleteTodo("string")).toEqual(null)
  })

});
