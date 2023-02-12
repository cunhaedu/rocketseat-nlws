import { injectable } from 'tsyringe';

import { CreateParticipant, ParticipantRepository } from '../../../repositories/ParticipantRepository';
import { ParticipantDTO } from '../../../dtos/ParticipantDTO';
import { prisma } from '../../../../../infra/prisma/client';

@injectable()
export class PrismaParticipantRepository implements ParticipantRepository {
  private repository;

  constructor() {
    this.repository = prisma.participant;
  }

  async create({ userId, poolId }: CreateParticipant): Promise<void> {
    await this.repository.create({
      data: {
        userId,
        poolId,
      }
    });
  }

  async findByPoolAndUserId(
    poolId: string,
    userId: string
  ): Promise<ParticipantDTO | null> {
    return this.repository.findUnique({
      where: {
        poolId_userId: {
          poolId,
          userId,
        }
      }
    })
  }
}
