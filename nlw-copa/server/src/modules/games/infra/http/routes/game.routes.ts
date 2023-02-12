import { FastifyInstance } from "fastify";
import { authenticate } from '../../../../../plugins/authenticate';
import { $ref } from '../../../schemas/game.schema';

import { GameController } from '../controllers/GameController';

export async function gameRoutes(server: FastifyInstance) {
  const gameController = new GameController();

  server.get(
    "/pools/:id",
    {
      onRequest: [authenticate],
      schema: {
        params: $ref("findGameByPoolSchema")
      }
    },
    gameController.listByPoolId,
  );
}
