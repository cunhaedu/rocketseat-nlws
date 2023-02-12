import { injectable } from 'tsyringe';

import { GameRepository } from '../../../game/domain/repositories/GameRepository';
import { Game } from '../../domain/entities/Game';
import { prisma } from '../../../../infra/prisma/client';

@injectable()
export class PrismaGameRepository implements GameRepository {
  private repository = prisma.game;

  async list(): Promise<Game[]> {
    return this.repository.findMany({
      include: {
        _count: {
          select: {
            ads: true
          }
        }
      }
    });
  }

  async find(gameId: string): Promise<Game | null> {
    return this.repository.findUnique({ where: { id: gameId } });
  }
}
