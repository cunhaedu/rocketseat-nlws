import { injectable } from 'tsyringe';

import { CreateUser, UserRepository } from '../../../repositories/UserRepository';
import { prisma } from '../../../../../infra/prisma/client';
import { UserDTO } from '../../../dtos/UserDTO';

@injectable()
export class PrismaUserRepository implements UserRepository {
  private repository;

  constructor() {
    this.repository = prisma.user;
  }

  async count(): Promise<number> {
    return this.repository.count();
  }

  async save({
    email,
    name,
    googleId,
    avatarUrl,
  }: CreateUser): Promise<UserDTO> {
    return this.repository.create({
      data: {
        email,
        name,
        googleId,
        avatarUrl,
      }
    });
  }

  async findByGoogleId(googleId: string): Promise<UserDTO | null> {
    return this.repository.findUnique({ where: { googleId } })
  }
}
