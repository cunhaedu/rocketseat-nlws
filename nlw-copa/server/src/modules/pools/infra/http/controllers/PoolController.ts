import { FastifyReply, FastifyRequest } from 'fastify';
import { container } from 'tsyringe';

import { CountPoolsService } from '../../../services/CountPoolsService';
import { CreatePoolService } from '../../../services/CreatePoolService';
import { CreatePoolInput, FindPoolInput, JoinPoolInput } from '../../../schemas/pool.schema';
import { JoinPoolService } from '../../../services/JoinPoolService';
import { ListUserPoolsService } from '../../../services/ListUserPoolsService';
import { FindPoolService } from '../../../services/FindPoolService';

export class PoolController {
  async count() {
    const countPoolService = container.resolve(CountPoolsService);

    return countPoolService.execute();
  }

  async findUserPools(request: FastifyRequest) {
    const userId = request.user.sub;
    const findUserPoolService = container.resolve(ListUserPoolsService);

    const pools = await findUserPoolService.execute(userId);

    return pools;
  }

  async findPool(request: FastifyRequest<{ Params: FindPoolInput }>) {
    const { id } = request.params;
    const findPoolService = container.resolve(FindPoolService);

    const pool = await findPoolService.execute(id);

    return pool;
  }

  async create(
    request: FastifyRequest<{ Body: CreatePoolInput }>,
    reply: FastifyReply
  ) {
    const { title } = request.body;

    let ownerId: string | null;

    try {
      await request.jwtVerify();
      ownerId = request.user.sub;
    } catch {
      ownerId = null;
    }

    const createPoolService = container.resolve(CreatePoolService);

    const pool = await createPoolService.execute({ title, ownerId });

    return reply.status(201).send({ code: pool.code })
  }

  async join(
    request: FastifyRequest<{ Body: JoinPoolInput }>,
    reply: FastifyReply
  ) {
    const { code } = request.body;
    const userId = request.user.sub;

    const joinPoolService = container.resolve(JoinPoolService);

    try {
      await joinPoolService.execute({ code, userId });
      return reply.status(201).send();
    } catch (error: any) {
      return reply.status(400).send({ message: error.message });
    }
  }
}
