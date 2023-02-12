import { Ad } from '../entities/Ad';

export interface AdRepository {
  create(data: Ad): Promise<void>;
  listByGameId(gameId: string): Promise<Ad[]>;
}
