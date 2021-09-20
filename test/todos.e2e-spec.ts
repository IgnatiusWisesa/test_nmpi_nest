import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TodosModule } from '../src/todos/todos.module'
import { Todo } from '../src/todos/schemas/todos.schema';
import { getModelToken } from '@nestjs/mongoose';
import { MockTodo, todo, todos, TodosControllerMock } from '../test/e2e.mock/todos.mock';

describe('TodosController (e2e)', () => {
  let app = `http://localhost:3001`;

  it('/todos (POST)', () => {
    return request(app)
        .post('/todos')
        .send({ task: 'waking up testing' })
        .set("Accept", "application/json")
        .expect("Content-Type", "application/json; charset=utf-8")
        .expect(response => {
            expect(response.body).toEqual({ __v: expect.any(Number), _id: expect.any(String), task: 'waking up testing' })
        })
        .expect(201);
  });

  it('/todos (GET)', () => {
    return request(app)
        .get('/todos/?task=waking up testing')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
            expect(response.body).toContainEqual({ __v: expect.any(Number),_id: expect.any(String), task: "waking up testing" })
        })
  });

  it('/todos (UPDATE)', () => {
    return request(app)
        .put(`/todos/?task=waking up testing`)
        .send({ task: 'waking up testing 1' })
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
            expect(response.body).toEqual([])
        })
  });

  it('/todos (DELETE)', () => {
    return request(app)
        .delete(`/todos/?task=waking up testing 1`)
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
            expect(response.body).toEqual([])
        })
  });

});
