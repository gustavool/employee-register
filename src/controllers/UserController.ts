import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UserService } from '../services/UserService';

class UserController {
  public async createUser(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { name, email, location, hiring_date } = request.body;

    const userService = container.resolve(UserService);

    const user = await userService.createUser({
      name,
      email,
      location,
      hiring_date,
    });

    return response.status(201).json(user);
  }

  async findById(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const userService = container.resolve(UserService);

    const user = await userService.findById(id);

    return response.status(201).json(user);
  }
}

export { UserController };
