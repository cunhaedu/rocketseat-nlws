import { Message, User } from '.prisma/client';

export interface IFindOptions {
  limit?: number | string;
}

export interface IMessageRepository {
  create(data: Message): Promise<
    Message & {
      user: User;
    }
  >;

  list(findOptions: IFindOptions): Promise<Message[]>;
}
