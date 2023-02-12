import { JWT } from '@fastify/jwt';
import 'fastify'

declare module 'fastify' {
  interface FastifyInstance {
    config: {
      JWT_SECRET: string;
    };
  }

  interface FastifyRequest {
    jwt: JWT;
  }

  export interface FastifyInstance {
    authenticate: any;
  }
}
