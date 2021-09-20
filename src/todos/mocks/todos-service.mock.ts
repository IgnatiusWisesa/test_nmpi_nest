export const MockTodosService = {
    createTodo: jest.fn().mockImplementation((dto) => {
        return {
            id: 'string',
            ...dto
        }
    }),
    updateTodo: jest.fn().mockImplementation((id, dto) => {
        if( typeof id !== 'string' ) return 'error'
        return {
            id,
            ...dto
        }
    }),
    findTodos: jest.fn().mockImplementation((task) => {
        if( !task ) task = 'string'
        return [{
            id: 'string',
            task
        }]    
    }),
    findById: jest.fn().mockImplementation((id) => {
        return {
            id,
            task: 'string'
        }
    }),
    deleteTodo: jest.fn().mockImplementation((id) => id ? null : undefined)
  }