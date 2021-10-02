import { AppError } from '../errors/AppError';
import { EmployeeRepositoryInMemory } from '../repositories/EmployeeRepositoryInMemory';
import { EmployeeService } from '../services/EmployeeService';

let employeeRepositoryInMemory: EmployeeRepositoryInMemory;
let employeeService: EmployeeService;
const validUuid = 'f7c216c6-6b41-4dc5-ab06-4dd06c13ecfc';
const invalidUuid = '123456-invalid-uuid';

describe('Employee tests', () => {
  beforeEach(() => {
    employeeRepositoryInMemory = new EmployeeRepositoryInMemory();
    employeeService = new EmployeeService(employeeRepositoryInMemory);
  });

  it('should be able to create a new employee', async () => {
    const employee = await employeeService.create({
      name: 'Employee test',
      position: 'Assistant',
      email: 'employee@mail.com',
      location: 'Sao Paulo, SP',
      department: 'Financial',
      hiring_date: new Date(),
    });

    expect(employee).toHaveProperty('id');
  });

  it('should not be able to create a new employee with exists email', async () => {
    expect(async () => {
      await employeeService.create({
        name: 'Employee test1',
        position: 'Assistant',
        email: 'employee@mail.com',
        location: 'Sao Paulo, SP',
        department: 'Financial',
        hiring_date: new Date(),
      });

      await employeeService.create({
        name: 'Employee test2',
        position: 'Manager',
        email: 'employee@mail.com',
        location: 'Rio de Janeiro, RJ',
        department: 'Sale',
        hiring_date: new Date(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to list employee by id', async () => {
    const employee = await employeeService.create({
      name: 'Employee test',
      position: 'Assistant',
      email: 'employee@mail.com',
      location: 'Sao Paulo, SP',
      department: 'Financial',
      hiring_date: new Date(),
    });

    const employeeById = await employeeService.findById(employee.id);

    expect(employeeById?.email).toEqual(employee.email);
  });

  it('should not be able to list employee by invalid uuid', async () => {
    expect(async () => {
      await employeeService.create({
        name: 'Employee test',
        position: 'Assistant',
        email: 'employee@mail.com',
        location: 'Sao Paulo, SP',
        department: 'Financial',
        hiring_date: new Date(),
      });

      await employeeService.findById(invalidUuid);
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be abre to list a not found employee by id', async () => {
    expect(async () => {
      await employeeService.create({
        name: 'Employee test',
        position: 'Assistant',
        email: 'employee@mail.com',
        location: 'Sao Paulo, SP',
        department: 'Financial',
        hiring_date: new Date(),
      });

      await employeeService.findById(validUuid);
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should be to list all employees', async () => {
    const employee1 = await employeeService.create({
      name: 'Employee test',
      position: 'Assistant',
      email: 'employee1@mail.com',
      location: 'Sao Paulo, SP',
      department: 'Financial',
      hiring_date: new Date(),
    });

    const employee2 = await employeeService.create({
      name: 'Employee test',
      position: 'Assistant',
      email: 'employee2@mail.com',
      location: 'Sao Paulo, SP',
      department: 'Financial',
      hiring_date: new Date(),
    });

    const employees = await employeeService.findAll();

    expect(employees).toEqual([employee1, employee2]);
  });

  it('should be able to update an employee', async () => {
    const employee = await employeeService.create({
      name: 'Employee test',
      position: 'Assistant',
      email: 'employee@mail.com',
      location: 'Sao Paulo, SP',
      department: 'Financial',
      hiring_date: new Date(),
    });

    employee.updated_at = new Date();

    const employeeUpdated = await employeeService.update(employee, employee.id);

    expect(employee.id).toEqual(employeeUpdated.id);
  });

  it('should not be able to update an employee by invalid uuid', async () => {
    expect(async () => {
      const employee = await employeeService.create({
        name: 'Employee test',
        position: 'Assistant',
        email: 'employee@mail.com',
        location: 'Sao Paulo, SP',
        department: 'Financial',
        hiring_date: new Date(),
      });

      employee.updated_at = new Date();

      await employeeService.update(employee, invalidUuid);
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a not found employee by id', async () => {
    expect(async () => {
      const employee = await employeeService.create({
        name: 'Employee test',
        position: 'Assistant',
        email: 'employee@mail.com',
        location: 'Sao Paulo, SP',
        department: 'Financial',
        hiring_date: new Date(),
      });

      employee.updated_at = new Date();

      await employeeService.update(employee, validUuid);
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to delete an employee', async () => {
    expect(async () => {
      const employee = await employeeService.create({
        name: 'Employee test',
        position: 'Assistant',
        email: 'employee@mail.com',
        location: 'Sao Paulo, SP',
        department: 'Financial',
        hiring_date: new Date(),
      });

      await employeeService.delete(employee.id);

      await employeeService.findById(employee.id);
    }).rejects.toBeInstanceOf(new AppError('Employee not found', 404));
  });
});
