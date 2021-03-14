import { config } from 'dotenv';
import supertest from 'supertest';
import app from '../../src/app';

import { createConnection, getConnection } from 'typeorm';
config();

describe('User Controller Tests', () => {
  beforeAll(async () => {
    await createConnection();
  });

  afterAll(async () => {
    await getConnection().close();
  });

  test('Should return 400 if invalid request.', async () => {
    const requestBody = {
      name: 'sut_name'
    };

    const response = await supertest(app).post('/users').send(requestBody);
    expect(response.status).toBe(400);
  });
});
