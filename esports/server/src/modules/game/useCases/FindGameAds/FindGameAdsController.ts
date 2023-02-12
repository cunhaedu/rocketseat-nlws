import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

import { FindGameAds } from './FindGameAds';

export class FindGameAdsController {
  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { gameId } = req.params;

      const listGames = container.resolve(FindGameAds);
      const games = await listGames.execute(String(gameId));

      res.json(games);
    } catch (error) {
      next(error);
    }
  }
}
