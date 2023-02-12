import { FastifyRequest } from 'fastify';
import { container } from 'tsyringe';

import { ListGamesByPoolAndUserIdService } from '../../../services/ListGamesByPoolAndUserIdService';
import { FindGameByPoolInput } from '../../../schemas/game.schema';

export class GameController {
  async listByPoolId(request: FastifyRequest<{ Params: FindGameByPoolInput }>) {
    const { id } = request.params;
    const userId = request.user.sub;
    const listGamesByPoolAndUserIdService = container.resolve(
      ListGamesByPoolAndUserIdService
    );

    return listGamesByPoolAndUserIdService.execute(id, userId);
  }
}
