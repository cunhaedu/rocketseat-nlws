import { NextFunction, Request, Response } from 'express';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

export class AuthenticateUserController {
  constructor(private authenticateUserUseCase: AuthenticateUserUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { code } = req.body;

      res.json(await this.authenticateUserUseCase.execute(code));
    } catch (err) {
      next(err);
    }
  }
}
