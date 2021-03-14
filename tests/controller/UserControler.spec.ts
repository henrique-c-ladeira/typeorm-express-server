import { config } from 'dotenv';
import supertest from 'supertest';
import app from '../../src/app';
import Chance from 'chance';

import { createConnection, getConnection } from 'typeorm';

console.log = () => null;
config();
process.env.mode = 'TEST';

describe('USER CONTROLLER TESTS', () => {
  const faker = new Chance();
  const validRequestBody = {
    name: faker.name(),
    email: faker.email(),
    password: faker.string(),
    phone: faker.phone(),
    birthday: faker.birthday()
  };
  const invalidRequestBody = {
    email: faker.email(),
    password: faker.string(),
    phone: faker.phone(),
    birthday: faker.birthday()
  };

  beforeAll(async () => {
    await createConnection();
  });

  afterAll(async () => {
    const connection = getConnection();
    const entities = connection.entityMetadatas;

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    entities.forEach(async (entity) => {
      const repository = await connection.getRepository(entity.name);
      await repository.clear();
    });
    await connection.close();
  });

  test('POST /users - Should return 200 if valid request.', async (done) => {
    const response = await supertest(app).post('/users').send(validRequestBody);
    expect(response.status).toBe(200);
    done();
  });

  test('POST /users - Should return 400 if invalid request.', async (done) => {
    const response = await supertest(app).post('/users').send(invalidRequestBody);
    expect(response.status).toBe(400);
    done();
  });

  test('GET /users/ - Should return 401 if not authenticated.', async (done) => {
    const response = await supertest(app).get('/users').send();
    expect(response.status).toBe(401);
    done();
  });

  test('GET /users/:id - Should return 401 if not authenticated.', async (done) => {
    const id = 'anyValidId';
    const response = await supertest(app).get(`/users/${id}`).send();
    expect(response.status).toBe(401);
    done();
  });
});
