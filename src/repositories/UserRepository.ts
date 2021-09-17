import { getRepository, Repository } from 'typeorm';
import { User } from '../entities/User';

interface ICreateUser {
  name: string;
  email: string;
  location: string;
  hiring_date: Date;
}

class UserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({
    name, email, location, hiring_date,
  }: ICreateUser): Promise<User> {
    const user = this.repository.create({
      name,
      email,
      location,
      hiring_date,
    });

    await this.repository.save(user);

    return user;
  }

  async findById(id: string): Promise<User | undefined> {
    const user = await this.repository.findOne(id);
    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.repository.findOne({ email });
    return user;
  }
}

export { UserRepository };
