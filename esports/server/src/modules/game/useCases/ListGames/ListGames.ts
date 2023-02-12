import { inject, injectable } from 'tsyringe';

import { GameRepository } from '../../../game/domain/repositories/GameRepository';
import { Game } from '../../domain/entities/Game';

@injectable()
export class ListGames {
  constructor(
    @inject('GameRepository')
    private gameRepository: GameRepository
  ) {}

  async execute(): Promise<Game[]> {
    return this.gameRepository.list();
  }
}
