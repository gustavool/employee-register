import { container } from 'tsyringe';

import { EmployeeRepository } from './src/repositories/EmployeeRepository';
import { EmployeeService } from './src/services/EmployeeService';

container.registerSingleton<EmployeeRepository>(
  'EmployeeRepository',
  EmployeeRepository
);

container.registerSingleton<EmployeeService>(
  'EmployeeService',
  EmployeeService
);
