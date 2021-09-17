import { inject, injectable } from 'tsyringe';
import { validate as uuidValidate } from 'uuid';

import { User } from '../entities/User';
import { AppError } from '../errors/AppError';
import { UserRepository } from '../repositories/UserRepository';

interface IRequest {
  name: string;
  email: string;
  location: string;
  hiring_date: Date;
}

@injectable()
class UserService {
  constructor(
    @inject('UserRepository')
    private userRepository: UserRepository
  ) {}

  async create({
    name,
    email,
    location,
    hiring_date,
  }: IRequest): Promise<User> {
    const userAlreadyExists = await this.userRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError('User already exists');
    }

    const user = await this.userRepository.create({
      name,
      email,
      location,
      hiring_date,
    });

    return user;
  }

  async findById(id: string): Promise<User | undefined> {
    if (!uuidValidate(id)) {
      throw new AppError('Invalid Uuid', 400);
    }

    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError('User not found', 404);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User not found', 404);
    }
    return user;
  }
}

export { UserService };
