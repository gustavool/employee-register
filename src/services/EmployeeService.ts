import { inject, injectable } from 'tsyringe';
import { validate as uuidValidate } from 'uuid';

import { Employee } from '../entities/Employee';
import { AppError } from '../errors/AppError';
import { EmployeeRepository } from '../repositories/EmployeeRepository';

interface IRequest {
  name: string;
  position: string;
  email: string;
  location: string;
  department: string;
  hiring_date: Date;
}

@injectable()
class EmployeeService {
  constructor(
    @inject('EmployeeRepository')
    private employeeRepository: EmployeeRepository
  ) {}

  async create({
    name,
    position,
    email,
    location,
    department,
    hiring_date,
  }: IRequest): Promise<Employee> {
    const employeeAlreadyExists = await this.employeeRepository.findByEmail(
      email
    );

    if (employeeAlreadyExists) {
      throw new AppError('Employee already exists');
    }

    const employee = await this.employeeRepository.create({
      name,
      position,
      email,
      location,
      department,
      hiring_date,
    });

    return employee;
  }

  async findById(id: string): Promise<Employee | undefined> {
    if (!uuidValidate(id)) {
      throw new AppError('Invalid Uuid', 400);
    }

    const employee = await this.employeeRepository.findById(id);

    if (!employee) {
      throw new AppError('Employee not found', 404);
    }
    return employee;
  }

  async findByEmail(email: string): Promise<Employee | undefined> {
    const employee = await this.employeeRepository.findByEmail(email);

    if (!employee) {
      throw new AppError('Employee not found', 404);
    }
    return employee;
  }

  async findAll(): Promise<Employee[]> {
    const employees = await this.employeeRepository.findAll();
    return employees;
  }
}

export { EmployeeService };