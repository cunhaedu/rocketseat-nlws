import { Game } from '../../entities/Game';

import { gamesMock } from '../../../../../core/tests/mocks/games.mock';
import { AdRepository } from '../AdRepository';
import { Ad } from '../../entities/Ad';

export class InMemoryAdRepository implements AdRepository {
  private games: Game[];

  constructor() {
    this.games = gamesMock;
  }

  async listByGameId(gameId: string): Promise<Ad[]> {
    const game = this.games.find(game => game.id === gameId);

    return game && game.ads ? game.ads : [];
  }

  async create(data: Ad): Promise<void> {
    const index = this.games.findIndex(game => game.id === data.gameId);

    this.games[index].ads?.push(data);
  }
}
