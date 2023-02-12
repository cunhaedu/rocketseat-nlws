import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';
import { AuthenticateUserController } from './AuthenticateUserController';
import { PrismaUserRepository } from '../../repositories/prisma/PrismaUserRepository';

const prismaUserRepository = new PrismaUserRepository();

const authenticateUserUseCase = new AuthenticateUserUseCase(
  prismaUserRepository,
);

const authenticateUserController = new AuthenticateUserController(
  authenticateUserUseCase,
);

export { authenticateUserUseCase, authenticateUserController };
