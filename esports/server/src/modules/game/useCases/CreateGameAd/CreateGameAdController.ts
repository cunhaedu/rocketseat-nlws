import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateGameAd } from './CreateGameAd';

export class CreateGameAdController {
  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { gameId } = req.params;
      const data = req.body;

      const createGameAd = container.resolve(CreateGameAd);
      const games = await createGameAd.execute(String(gameId), data);

      res.json(games);
    } catch (error) {
      next(error);
    }
  }
}
