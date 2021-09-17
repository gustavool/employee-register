import { Repository, getRepository } from 'typeorm';

import { Employee } from '../entities/Employee';

interface ICreateEmployee {
  name: string;
  email: string;
  location: string;
  hiring_date: Date;
}

class EmployeeRepository {
  private repository: Repository<Employee>;

  constructor() {
    this.repository = getRepository(Employee);
  }

  async create({
    name,
    email,
    location,
    hiring_date,
  }: ICreateEmployee): Promise<Employee> {
    const employee = this.repository.create({
      name,
      email,
      location,
      hiring_date,
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
}

export { EmployeeRepository };
