/* eslint-disable camelcase */
import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import axios from 'axios';
import github from '@config/github';
import auth from '@config/auth';
import { sign } from 'jsonwebtoken';
import { User } from '.prisma/client';

import { githubApi } from '../../../../services/api';

interface IAccessTokenResponse {
  access_token: string;
}

interface IGithubUserResponse {
  id: number;
  avatar_url: string;
  login: string;
  name: string;
}

export class AuthenticateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(code: string) {
    const { data } = await axios.post<IAccessTokenResponse>(
      'https://github.com/login/oauth/access_token',
      null,
      {
        params: {
          client_id: github.CLIENT_ID,
          client_secret: github.CLIENT_SECRET,
          code,
        },
        headers: {
          Accept: 'application/json',
        },
      },
    );

    const { data: response } = await githubApi.get<IGithubUserResponse>(
      'user',
      {
        headers: {
          authorization: `Bearer ${data.access_token}`,
        },
      },
    );

    const { login, id, avatar_url, name } = response;

    let user = await this.userRepository.findByGithubId(id);

    if (!user) {
      user = await this.userRepository.create({
        login,
        avatar_url,
        name,
        github_id: id,
      } as User);
    }

    const token = sign(
      {
        user: { name: user.name, avatar_url: user.avatar_url, id: user.id },
      },
      auth.SECRET_KEY,
      { subject: user.id, expiresIn: auth.EXPIRES_IN },
    );

    return { token, user };
  }
}
