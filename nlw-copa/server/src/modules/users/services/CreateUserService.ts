import { inject, injectable } from 'tsyringe';
import fetch from 'node-fetch';
import { z } from 'zod';

import { UserRepository } from '../repositories/UserRepository';
import { JWT } from '@fastify/jwt';

type CreateUserRequest = {
  access_token: string;
  jwt: JWT,
}

@injectable()
export class CreateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: UserRepository
  ) {}

  async execute({ access_token, jwt }: CreateUserRequest): Promise<{ token: string }> {
    const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${access_token}`,
      }
    });

    const userData = await userResponse.json();


    const userInfoSchema = z.object({
      id: z.string(),
      email: z.string().email(),
      name: z.string(),
      picture: z.string().url(),
    });

    const userInfo = userInfoSchema.parse(userData);

    let user = await this.userRepository.findByGoogleId(userInfo.id);

    if (!user) {
      user = await this.userRepository.save({
        googleId: userInfo.id,
        name: userInfo.name,
        email: userInfo.email,
        avatarUrl: userInfo.picture,
      })
    }

    const token = jwt.sign({
      name: user.name,
      avatarUrl: user.avatarUrl,
    }, {
      sub: user.id,
      expiresIn: '7 days',
    });

    return { token }
  }
}
