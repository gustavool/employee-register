import { Employee } from '../entities/Employee';

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

interface IEmployeeRepository {
  create(data: ICreateEmployee): Promise<Employee>;

  findById(id: string): Promise<Employee | undefined>;

  findByEmail(email: string): Promise<Employee | undefined>;

  findAll(): Promise<Employee[]>;

  delete(id: string): Promise<void>;

  update(employee: Employee): Promise<Employee>;
}

export { IEmployeeRepository };
