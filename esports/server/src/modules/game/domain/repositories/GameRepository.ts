import { Game } from '../entities/Game';

export interface GameRepository {
  find(gameId: string): Promise<Game | null>;
  list(): Promise<Game[]>;
}
