import { User } from '.prisma/client';

export interface IUserRepository {
  findByGithubId(id: number): Promise<User | null>;
  findById(userId: string): Promise<User | null>;
  create(data: User): Promise<User>;
}
