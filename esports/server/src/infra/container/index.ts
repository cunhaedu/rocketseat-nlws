import { container } from 'tsyringe';

import { PrismaGameRepository } from '../../modules/game/prisma/repositories/PrismaGameRepository';
import { PrismaAdRepository } from '../../modules/game/prisma/repositories/PrismaAdRepository';
import { GameRepository } from '../../modules/game/domain/repositories/GameRepository';
import { AdRepository } from '../../modules/game/domain/repositories/AdRepository';

container.registerSingleton<GameRepository>(
  'GameRepository',
  PrismaGameRepository
)

container.registerSingleton<AdRepository>(
  'AdRepository',
  PrismaAdRepository
)
