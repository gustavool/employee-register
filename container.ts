import { container } from 'tsyringe';

import { EmployeeRepository } from './src/repositories/EmployeeRepository';

container.registerSingleton<EmployeeRepository>(
  'EmployeeRepository',
  EmployeeRepository
);
