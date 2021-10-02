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

class EmployeeRepositoryInMemory implements IEmployeeRepository {
  employees: Employee[] = [];

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
    const employee = new Employee();

    Object.assign(employee, {
      name,
      position,
      email,
      location,
      department,
      hiring_date,
      created_at,
      updated_at,
    });

    this.employees.push(employee);

    return employee;
  }

  async findById(id: string): Promise<Employee | undefined> {
    return this.employees.find(employee => employee.id === id);
  }

  async findByEmail(email: string): Promise<Employee | undefined> {
    return this.employees.find(employee => employee.email === email);
  }

  async findAll(): Promise<Employee[]> {
    return this.employees;
  }

  async delete(id: string): Promise<void> {
    const employeeToDelete = this.employees.find(
      employee => employee.id === id
    );
    this.employees = this.employees.filter(
      employee => employee !== employeeToDelete
    );
  }

  async update(employee: Employee): Promise<Employee> {
    const employeeIndex = this.employees.findIndex(
      employeeItem => employeeItem.id === employee.id
    );
    Object.assign(this.employees[employeeIndex], employee);
    return this.employees[employeeIndex];
  }
}

export { EmployeeRepositoryInMemory };
