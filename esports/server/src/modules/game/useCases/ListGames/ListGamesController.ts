import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListGames } from './ListGames';

export class ListGamesController {
  async handle(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const listGames = container.resolve(ListGames);
      const games = await listGames.execute();

      res.json(games);
    } catch (error) {
      next(error);
    }
  }
}
