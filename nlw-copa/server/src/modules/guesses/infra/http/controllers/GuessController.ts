import { FastifyReply, FastifyRequest } from 'fastify';
import { container } from 'tsyringe';

import { CountGuessesService } from '../../../services/CountGuessesService';
import { CreateGuessService } from '../../../services/CreateGuessService';
import {
  CreateGuessBodyInput,
  CreateGuessParamsInput
} from '../../../schemas/guess.schema';

export class GuessController {
  async count() {
    const countGuessesService = container.resolve(CountGuessesService);

    return countGuessesService.execute();
  }

  async create(
    request: FastifyRequest<{
      Params: CreateGuessParamsInput,
      Body: CreateGuessBodyInput
    }>,
    reply: FastifyReply,
  ) {
    const { firstTeamPoints, secondTeamPoints } = request.body;
    const { gameId, poolId } = request.params;
    const userId = request.user.sub;

    const createGuessService = container.resolve(CreateGuessService);

    try {
      await createGuessService.execute({
        secondTeamPoints,
        firstTeamPoints,
        gameId,
        poolId,
        userId,
      });

      return reply.status(201).send()
    } catch (error: any) {
      return reply.status(400).send({ message: error.message })
    }
  }
}
