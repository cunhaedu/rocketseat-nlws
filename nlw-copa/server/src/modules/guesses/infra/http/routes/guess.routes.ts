import { FastifyInstance } from "fastify";
import { authenticate } from '../../../../../plugins/authenticate';
import { $ref } from '../../../schemas/guess.schema';

import { GuessController } from '../controllers/GuessController';

export async function guessRoutes(server: FastifyInstance) {
  const guessController = new GuessController();

  server.get(
    "/count",
    guessController.count,
  );

  server.post(
    "/games/:gameId/pools/:poolId",
    {
      onRequest: [authenticate],
      schema: {
        params: $ref("createGuessParamsSchema"),
        body: $ref("createGuessBodySchema")
      }
    },
    guessController.create,
  );
}
