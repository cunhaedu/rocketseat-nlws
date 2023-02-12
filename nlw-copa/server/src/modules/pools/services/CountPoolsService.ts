import { inject, injectable } from 'tsyringe';

import { PoolRepository } from '../repositories/PoolRepository';

@injectable()
export class CountPoolsService {
  constructor(
    @inject('PoolRepository')
    private poolRepository: PoolRepository
  ) {}

  async execute(): Promise<{ count: number }> {
    const count = await this.poolRepository.count();

    return { count }
  }
}
