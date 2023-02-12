import { FastifyRequest } from 'fastify';

export async function authenticate<T extends FastifyRequest>(request: T) {
  await request.jwtVerify();
}
