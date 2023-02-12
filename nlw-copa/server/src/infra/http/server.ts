import env, { fastifyEnvOpt } from '@fastify/env';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import Fastify from 'fastify';

import 'reflect-metadata';

import '../container';

import { guessRoutes } from '../../modules/guesses/infra/http/routes/guess.routes';
import { gameRoutes } from '../../modules/games/infra/http/routes/game.routes';
import { poolRoutes } from '../../modules/pools/infra/http/routes/pool.routes';
import { userRoutes } from '../../modules/users/infra/http/routes/user.routes';
import { userSchemas } from '../../modules/users/schemas/create-user.schema';
import { guessSchemas } from '../../modules/guesses/schemas/guess.schema';
import { poolSchemas } from '../../modules/pools/schemas/pool.schema';
import { gameSchemas } from '../../modules/games/schemas/game.schema';

const EnvSchema: fastifyEnvOpt = {
  confKey: 'config',
  dotenv: true,
  data: process.env,
  schema: {
    type: 'object',
    required: ['JWT_SECRET'],
    properties: {
      JWT_SECRET: {
        type: 'string',
        default: 'nlw-copa',
      }
    }
  }
}

async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  });

  await fastify.register(cors, {
    origin: true,
  });

  await fastify.register(env, EnvSchema);

  for (
    const schema of [
      ...poolSchemas,
      ...userSchemas,
      ...gameSchemas,
      ...guessSchemas
    ]
  ) {
    fastify.addSchema(schema);
  }

  fastify.register(guessRoutes, { prefix: "guesses" });
  fastify.register(gameRoutes, { prefix: "games" });
  fastify.register(poolRoutes, { prefix: "pools" });
  fastify.register(userRoutes, { prefix: "users" });

  await fastify.register(jwt, {
    secret: fastify.config.JWT_SECRET,
  }).ready();

  await fastify.listen({ port: 3333, host: '0.0.0.0' });
}

bootstrap();
