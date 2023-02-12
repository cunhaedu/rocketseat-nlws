import { inject, injectable } from 'tsyringe';
import { GameRepository } from '../repositories/GameRepository';

@injectable()
export class ListGamesByPoolAndUserIdService {
  constructor(
    @inject('GameRepository')
    private gameRepository: GameRepository
  ) {}

  async execute(poolId: string, userId: string) {
    const games = await this.gameRepository.listByPoolAndUserId(poolId, userId);

    const formattedGames = games.map(game => ({
      ...game,
      guess: game.guesses.length > 0 ? game.guesses[0] : null,
      guesses: undefined,
    }));

    return { games: formattedGames }
  }
}
