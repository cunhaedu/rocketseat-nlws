import { UserDTO } from '../dtos/UserDTO';

export type CreateUser = {
  email: string;
  name: string;
  googleId: string;
  avatarUrl?: string;
}

export interface UserRepository {
  count(): Promise<number>;
  save(data: CreateUser): Promise<UserDTO>;
  findByGoogleId(googleId: string): Promise<UserDTO | null>;
}
