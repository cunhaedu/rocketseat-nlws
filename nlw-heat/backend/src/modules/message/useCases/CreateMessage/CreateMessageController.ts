import { NextFunction, Request, Response } from 'express';
import { CreateMessage } from './CreateMessage';

export class CreateMessageController {
  constructor(private createMessage: CreateMessage) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { message } = req.body;
      const { userId } = req;

      res.status(201).json(await this.createMessage.execute(message, userId));
    } catch (error) {
      next(error);
    }
  }
}
