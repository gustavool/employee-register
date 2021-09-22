import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { EmployeeService } from '../services/EmployeeService';

class EmployeeController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, position, email, location, department, hiring_date } =
      request.body;

    const employeeService = container.resolve(EmployeeService);

    const employee = await employeeService.create({
      name,
      position,
      email,
      location,
      department,
      hiring_date,
    });

    return response.status(201).json(employee);
  }

  async findById(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const employeeService = container.resolve(EmployeeService);

    const employee = await employeeService.findById(id);

    return response.status(201).json(employee);
  }

  async findAll(request: Request, response: Response): Promise<Response> {
    const employeeService = container.resolve(EmployeeService);

    const employees = await employeeService.findAll();

    return response.status(201).json(employees);
  }
}

export { EmployeeController };
