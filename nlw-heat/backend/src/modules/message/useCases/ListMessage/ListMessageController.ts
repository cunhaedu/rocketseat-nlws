import { NextFunction, Request, Response } from 'express';
import { ListMessage } from './ListMessage';

export class ListMessageController {
  constructor(private listMessage: ListMessage) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { limit } = req.query;

      res.json(await this.listMessage.execute(limit as string));
    } catch (error) {
      next(error);
    }
  }
}
