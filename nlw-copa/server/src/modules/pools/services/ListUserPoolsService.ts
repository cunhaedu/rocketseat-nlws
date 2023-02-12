import { inject, injectable } from 'tsyringe';
import { PoolDTO } from '../dtos/PoolDTO';

import { PoolRepository } from '../repositories/PoolRepository';

@injectable()
export class ListUserPoolsService {
  constructor(
    @inject('PoolRepository')
    private poolRepository: PoolRepository
  ) {}

  async execute(userId: string): Promise<{ pools: PoolDTO[] }> {
    const pools = await this.poolRepository.findUserPools(userId);

    return { pools }
  }
}
