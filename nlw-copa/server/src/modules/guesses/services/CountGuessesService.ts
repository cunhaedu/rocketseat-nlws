import { inject, injectable } from 'tsyringe';

import { GuessRepository } from '../repositories/GuessRepository';

@injectable()
export class CountGuessesService {
  constructor(
    @inject('GuessRepository')
    private guessRepository: GuessRepository
  ) {}

  async execute(): Promise<{ count: number }> {
    const count = await this.guessRepository.count();

    return { count }
  }
}
