import { NextFunction, Request, Response } from 'express';
import { UserProfile } from './UserProfile';

export class UserProfileController {
  constructor(private userProfile: UserProfile) {}

  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { userId } = req;

      res.json(await this.userProfile.execute(userId));
    } catch (err) {
      next(err);
    }
  }
}
