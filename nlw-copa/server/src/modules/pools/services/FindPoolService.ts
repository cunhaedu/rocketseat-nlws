import { inject, injectable } from 'tsyringe';
import { PoolDTO } from '../dtos/PoolDTO';

import { PoolRepository } from '../repositories/PoolRepository';

@injectable()
export class FindPoolService {
  constructor(
    @inject('PoolRepository')
    private poolRepository: PoolRepository
  ) {}

  async execute(poolId: string): Promise<PoolDTO> {
    const pool = await this.poolRepository.findById(poolId);

    if (!pool) {
      throw new Error('Pool not Found!');
    }

    return pool;
  }
}
