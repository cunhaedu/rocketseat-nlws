import { injectable } from 'tsyringe';

import { AdRepository } from '../../domain/repositories/AdRepository';
import { Ad } from '../../../../modules/game/domain/entities/Ad';
import { prisma } from '../../../../infra/prisma/client';

@injectable()
export class PrismaAdRepository implements AdRepository {
  private repository = prisma.ad;

  async listByGameId(gameId: string): Promise<Ad[]> {
    return this.repository.findMany({
      where: { gameId },
      orderBy: { createdAt: 'desc' }
    });
  }

  async create(data: Ad): Promise<void> {
    const ad = new Ad();

    Object.assign(ad, data);

    await this.repository.create({ data: ad });
  }
}
