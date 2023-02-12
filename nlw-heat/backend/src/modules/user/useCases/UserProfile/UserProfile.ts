/* eslint-disable camelcase */
import { IUserRepository } from '@modules/user/repositories/IUserRepository';

export class UserProfile {
  constructor(private userRepository: IUserRepository) {}

  async execute(userId: string) {
    return this.userRepository.findById(userId);
  }
}
