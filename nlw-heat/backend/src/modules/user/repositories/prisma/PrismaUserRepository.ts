import { prisma } from '@infra/prisma/client';
import { User } from '.prisma/client';
import { IUserRepository } from '../IUserRepository';

export class PrismaUserRepository implements IUserRepository {
  constructor(private repository = prisma.user) {}

  async findByGithubId(id: number): Promise<User | null> {
    return this.repository.findFirst({
      where: {
        github_id: id,
      },
    });
  }

  async findById(userId: string): Promise<User | null> {
    return this.repository.findFirst({
      where: {
        id: userId,
      },
    });
  }

  async create(data: User): Promise<User> {
    return prisma.user.create({
      data,
    });
  }
}
