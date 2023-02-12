import { container } from 'tsyringe';

import { PrismaParticipantRepository } from '../../modules/pools/infra/prisma/repositories/PrismaParticipantRepository';
import { PrismaGuessRepository } from '../../modules/guesses/infra/prisma/repositories/PrismaGuessRepository';
import { PrismaPoolRepository } from '../../modules/pools/infra/prisma/repositories/PrismaPoolRepository';
import { PrismaUserRepository } from '../../modules/users/infra/prisma/repositories/PrismaUserRepository';
import { PrismaGameRepository } from '../../modules/games/infra/prisma/repositories/PrismaGameRepository';
import { ParticipantRepository } from '../../modules/pools/repositories/ParticipantRepository';
import { GuessRepository } from '../../modules/guesses/repositories/GuessRepository';
import { GameRepository } from '../../modules/games/repositories/GameRepository';
import { PoolRepository } from '../../modules/pools/repositories/PoolRepository';
import { UserRepository } from '../../modules/users/repositories/UserRepository';

container.registerSingleton<PoolRepository>(
  'PoolRepository',
  PrismaPoolRepository,
);

container.registerSingleton<UserRepository>(
  'UserRepository',
  PrismaUserRepository,
);

container.registerSingleton<GuessRepository>(
  'GuessRepository',
  PrismaGuessRepository,
);

container.registerSingleton<ParticipantRepository>(
  'ParticipantRepository',
  PrismaParticipantRepository,
);

container.registerSingleton<GameRepository>(
  'GameRepository',
  PrismaGameRepository,
);
