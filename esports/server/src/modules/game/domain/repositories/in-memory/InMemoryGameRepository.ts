import { Game } from '../../entities/Game';
import { GameRepository } from '../GameRepository';
import { gamesMock } from '../../../../../core/tests/mocks/games.mock';

export class InMemoryGameRepository implements GameRepository {
  private games: Game[];

  constructor() {
    this.games = gamesMock;
  }

  async list(): Promise<Game[]> {
    return this.games;
  }

  async find(gameId: string): Promise<Game | null> {
    return this.games.find(game => game.id === gameId) ?? null;
  }
}
