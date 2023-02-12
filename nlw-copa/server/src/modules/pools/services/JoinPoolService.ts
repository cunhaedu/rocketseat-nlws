import { inject, injectable } from 'tsyringe';

import { PoolRepository } from '../repositories/PoolRepository';
import { ParticipantRepository } from '../repositories/ParticipantRepository';

type JoinPoolRequest = {
  code: string;
  userId: string;
}

@injectable()
export class JoinPoolService {
  constructor(
    @inject('PoolRepository')
    private poolRepository: PoolRepository,

    @inject('ParticipantRepository')
    private participantRepository: ParticipantRepository
  ) {}

  async execute({ code, userId }: JoinPoolRequest): Promise<void> {
    const pool = await this.poolRepository.findByCode(code, userId);

    if (!pool) {
      throw new Error('Pool not found!');
    }

    if (pool.participants && pool.participants.length) {
      throw new Error('User has already joined this pool!');
    }

    if (!pool.ownerId) {
      await this.poolRepository.updateOwner(pool.id, userId);
    }

    await this.participantRepository.create({
      poolId: pool.id,
      userId,
    });
  }
}
