import { GameDTO } from '../dtos/GameDTO';

export interface GameRepository {
  listByPoolAndUserId(poolId: string, userId: string): Promise<GameDTO[]>;
  findById(gameId: string): Promise<GameDTO | null>;
}
