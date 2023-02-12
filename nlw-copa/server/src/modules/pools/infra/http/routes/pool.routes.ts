import { FastifyInstance } from "fastify";

import { PoolController } from "../controllers/PoolController";
import { $ref } from "../../../schemas/pool.schema";
import { authenticate } from '../../../../../plugins/authenticate';

export async function poolRoutes(server: FastifyInstance) {
  const poolController = new PoolController();

  server.post(
    "/",
    {
      schema: {
        body: $ref("createPoolSchema"),
        response: {
          201: $ref("createPoolResponseSchema"),
        },
      },
    },
    poolController.create,
  );

  server.post(
    "/join",
    {
      onRequest: [authenticate],
      schema: {
        body: $ref("joinPoolSchema"),
      },
    },
    poolController.join,
  );

  server.get(
    "/count",
    poolController.count,
  );

  server.get(
    "/:id",
    {
      onRequest: [authenticate],
      schema: {
        params: $ref("findPoolSchema"),
      },
    },
    poolController.findPool,
  );

  server.get(
    "/",
    {
      onRequest: [authenticate],
    },
    poolController.findUserPools,
  );
}
