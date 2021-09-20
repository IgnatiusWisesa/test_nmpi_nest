import { Test, TestingModule } from '@nestjs/testing';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service'
import { MockTodosService } from './mocks/todos-service.mock'

describe('TodosController', () => {
  let controller: TodosController;

  const mockTodosService = MockTodosService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodosController],
      providers: [TodosService]
    })
      .overrideProvider(TodosService)
      .useValue(mockTodosService)
      .compile();

    controller = module.get<TodosController>(TodosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  let dto = { task: 'eating' }

  it(`should create a todo`, () => {
    expect(controller.addTodo(dto)).toEqual({
      id: expect.any(String),
      task: 'eating'
    })

    expect(mockTodosService.createTodo).toHaveBeenCalledWith(dto)
  })

  it(`should update a todo`, () => {
    expect(mockTodosService.updateTodo('string', dto)).toEqual({
      id: 'string', ...dto
    })

    expect(mockTodosService.updateTodo).toHaveBeenCalledWith('string', dto)
  })

  it(`should find todos if query search exist`, () => {
    expect(mockTodosService.findTodos('sleeping')).toEqual([{
      id: 'string',
      task: 'sleeping'
    }])

    expect(mockTodosService.findTodos).toHaveBeenCalledWith('sleeping')
  })

  it(`should find todos if query search does not exist`, () => {
    expect(mockTodosService.findTodos()).toEqual([{
      id: 'string',
      task: 'string'
    }])

    expect(mockTodosService.findTodos).toHaveBeenCalled()
  })

  it(`should find todo by id`, () => {
    expect(mockTodosService.findById(2)).toEqual({
      id: 2,
      task: 'string'
    })
  })

  it(`should delete a todo by id`, () => {
    expect(mockTodosService.deleteTodo(2)).toBe(null)
    expect(mockTodosService.deleteTodo).toHaveBeenCalled()
  })
});
