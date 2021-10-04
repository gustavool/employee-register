import request from 'supertest';
import { Connection, createConnection } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { app } from '../app';

let connection: Connection;
describe('POST /employees', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should return 201 and create a new employee', async () => {
    const response = await request(app).post('/employees').send({
      name: 'Employee name',
      position: 'Assistant',
      email: `employee@mail.com`,
      location: 'Sao Paulo/SP',
      department: 'Financial',
      hiring_date: '2021-10-10',
    });

    expect(response.status).toBe(201);
  });

  it('should return 400 because employee email already exists', async () => {
    const response = await request(app).post('/employees').send({
      name: 'Employee name',
      position: 'Assistant',
      email: `employee@mail.com`,
      location: 'Sao Paulo/SP',
      department: 'Financial',
      hiring_date: '2021-10-10',
    });

    expect(response.status).toBe(400);
  });
});
