import { inject, injectable } from 'tsyringe';

import { UserRepository } from '../repositories/UserRepository';

@injectable()
export class CountUsersService {
  constructor(
    @inject('UserRepository')
    private userRepository: UserRepository
  ) {}

  async execute(): Promise<{ count: number }> {
    const count = await this.userRepository.count();

    return { count }
  }
}
