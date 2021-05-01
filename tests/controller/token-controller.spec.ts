import { config } from 'dotenv';
import supertest from 'supertest';
import app from '../../src/server';

import { createConnection, getConnection } from 'typeorm';

console.log = () => null;
config();
process.env.mode = 'TEST';

describe('TOKEN CONTROLLER TESTS', () => {
  beforeAll(async () => {
    await createConnection();
  });

  afterAll(async () => {
    const connection = getConnection();
    const entities = connection.entityMetadatas;

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    entities.forEach(async entity => {
      const repository = await connection.getRepository(entity.name);
      await repository.clear();
    });
    await connection.close();
  });

  test('POST /token - Should return 400 if invalid request.', async done => {
    const response = await supertest(app).post('/token').send();
    expect(response.status).toBe(400);
    done();
  });

  test('DELETE /token - Should return 401 if not authenticated.', async done => {
    const response = await supertest(app).delete('/token').send();
    expect(response.status).toBe(401);
    done();
  });
});
