import { FastifyReply, FastifyRequest } from 'fastify';
import { container } from 'tsyringe';

import { CountUsersService } from '../../../services/CountUsersService';
import { CreateUserInput } from '../../../schemas/create-user.schema';
import { CreateUserService } from '../../../services/CreateUserService';

export class UserController {
  async count() {
    const countUserService = container.resolve(CountUsersService);

    return countUserService.execute();
  }

  async me(request: FastifyRequest) {
    return { user: request.user }
  }

  async create(
    request: FastifyRequest<{ Body: CreateUserInput }>,
    reply: FastifyReply,
  ) {
    const { access_token } = request.body;

    const createUserService = container.resolve(CreateUserService);

    const { token } = await createUserService.execute({
      access_token,
      jwt: request.server.jwt
    });

    return reply.status(201).send({ token });
  }
}
