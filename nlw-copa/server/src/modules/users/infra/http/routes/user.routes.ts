import { FastifyInstance } from "fastify";

import { UserController } from '../controllers/UserController';
import { $ref } from '../../../schemas/create-user.schema';
import { authenticate } from '../../../../../plugins/authenticate';

export async function userRoutes(server: FastifyInstance) {
  const userController = new UserController();

  server.get(
    "/count",
    userController.count,
  );

  server.get(
    '/me',
    { onRequest: [authenticate] },
    userController.me,
  );

  server.post(
    "/",
    {
      schema: {
        body: $ref("createUserSchema"),
      },
    },
    userController.create,
  );
}
