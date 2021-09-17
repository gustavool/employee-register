import { container } from 'tsyringe';

import { UserRepository } from './src/repositories/UserRepository';

container.registerSingleton<UserRepository>('UserRepository', UserRepository);
