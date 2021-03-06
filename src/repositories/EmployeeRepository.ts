import { Repository, getRepository } from 'typeorm';

import { Employee } from '../entities/Employee';
import { IEmployeeRepository } from './IEmployeeRepository';

interface ICreateEmployee {
  name: string;
  position: string;
  email: string;
  location: string;
  department: string;
  hiring_date: Date;
  created_at: Date;
  updated_at: Date;
}

class EmployeeRepository implements IEmployeeRepository {
  private repository: Repository<Employee>;

  constructor() {
    this.repository = getRepository(Employee);
  }

  async create({
    name,
    position,
    email,
    location,
    department,
    hiring_date,
    created_at,
    updated_at,
  }: ICreateEmployee): Promise<Employee> {
    const employee = this.repository.create({
      name,
      position,
      email,
      location,
      department,
      hiring_date,
      created_at,
      updated_at,
    });

    await this.repository.save(employee);

    return employee;
  }

  async findById(id: string): Promise<Employee | undefined> {
    const employee = await this.repository.findOne(id);
    return employee;
  }

  async findByEmail(email: string): Promise<Employee | undefined> {
    const employee = await this.repository.findOne({ email });
    return employee;
  }

  async findAll(): Promise<Employee[]> {
    const employees = await this.repository.find();
    return employees;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async update(employee: Employee): Promise<Employee> {
    return this.repository.save(employee);
  }
}

export { EmployeeRepository };
