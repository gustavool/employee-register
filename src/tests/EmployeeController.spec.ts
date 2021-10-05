import request from 'supertest';
import { Connection, createConnection } from 'typeorm';

import { app } from '../app';

let connection: Connection;
describe('Employee controller tests', () => {
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
      name: 'Employee1 name',
      position: 'Assistant',
      email: `employee1@mail.com`,
      location: 'Sao Paulo/SP',
      department: 'Financial',
      hiring_date: '2021-10-10',
    });

    expect(response.status).toBe(201);
  });

  it('should return 400 because employee email already exists', async () => {
    const response = await request(app).post('/employees').send({
      name: 'Employee1 name',
      position: 'Assistant',
      email: `employee1@mail.com`,
      location: 'Sao Paulo/SP',
      department: 'Financial',
      hiring_date: '2021-10-10',
    });

    expect(response.status).toBe(400);
  });

  it('should return 200 and get employee by id', async () => {
    // only one employee created
    const responseGetAll = await request(app).get('/employees');

    const employeeId = responseGetAll.body[0].id;

    const responseGetById = await request(app).get(`/employees/${employeeId}`);

    expect(responseGetById.status).toBe(200);
    expect(responseGetById.body.name).toEqual('Employee1 name');
  });

  it('should return 200 and update employee by id', async () => {
    // only one employee created
    const responseGetAll = await request(app).get('/employees');

    const employeeId = responseGetAll.body[0].id;

    const employeeData = {
      name: 'Employee1 name',
      position: 'Manager',
      email: 'employee1@mail.com',
      location: 'Sao Paulo/SP',
      department: 'Sale',
      hiring_date: '2021-10-10',
    };

    await request(app).put(`/employees/${employeeId}`).send(employeeData);

    // only one employee is returned
    const responseUpdateById = await request(app).get('/employees');

    expect(responseUpdateById.status).toBe(200);
    expect(responseUpdateById.body[0].email).toBe(employeeData.email);
    expect(responseUpdateById.body[0].position).toEqual('Manager');
    expect(responseUpdateById.body[0].department).toEqual('Sale');
  });

  it('should return 204 and delete employee by id', async () => {
    // only one employee created
    const responseGetAll = await request(app).get('/employees');

    const employeeId = responseGetAll.body[0].id;

    const responseDeleteById = await request(app).delete(
      `/employees/${employeeId}`
    );

    expect(responseDeleteById.status).toBe(204);
  });

  it('should return 200 and get all employees', async () => {
    await request(app).post('/employees').send({
      name: 'Employee1 name',
      position: 'Assistant',
      email: `employee1@mail.com`,
      location: 'Sao Paulo/SP',
      department: 'Financial',
      hiring_date: '2021-10-10',
    });

    const response = await request(app).get('/employees');

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  });
});
