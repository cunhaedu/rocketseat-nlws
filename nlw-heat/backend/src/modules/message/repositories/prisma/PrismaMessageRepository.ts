import { prisma } from '@infra/prisma/client';
import { Message, User } from '.prisma/client';
import { IFindOptions, IMessageRepository } from '../IMessageRepository';

export class PrismaMessageRepository implements IMessageRepository {
  constructor(private repository = prisma.message) {}

  async create(data: Message): Promise<
    Message & {
      user: User;
    }
  > {
    return this.repository.create({
      data,
      include: { user: true },
    });
  }

  async list(findOptions: IFindOptions): Promise<Message[]> {
    return this.repository.findMany({
      take: Number(findOptions.limit),
      orderBy: {
        created_at: 'desc',
      },
      include: {
        user: true,
      },
    });
  }
}
