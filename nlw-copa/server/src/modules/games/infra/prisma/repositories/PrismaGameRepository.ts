import { injectable } from 'tsyringe';

import { GameRepository } from '../../../repositories/GameRepository';
import { prisma } from '../../../../../infra/prisma/client';
import { GameDTO } from '../../../dtos/GameDTO';

@injectable()
export class PrismaGameRepository implements GameRepository {
  private repository;

  constructor() {
    this.repository = prisma.game;
  }

  listByPoolAndUserId(poolId: string, userId: string): Promise<GameDTO[]> {
    return this.repository.findMany({
      orderBy: {
        date: 'desc',
      },
      include: {
        guesses: {
          where: {
            participant: {
              userId,
              poolId,
            }
          }
        }
      }
    });
  }

  async findById(id: string): Promise<GameDTO | null> {
    return this.repository.findUnique({
      where: {
        id
      },
      include: {
        guesses: true,
      }
    })
  }
}
