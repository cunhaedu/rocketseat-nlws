import { decode } from 'jsonwebtoken';

import { fail, forbidden, HttpResponse, ok } from '@core/infra/HttpResponse';
import { IMiddleware } from '@core/infra/Middleware';

import { AccessDeniedError } from '../errors/AccessDeniedError';

type EnsureAuthenticatedMiddlewareRequest = {
  accessToken: string;
};

type DecodedJwt = {
  sub: string;
};

export class EnsureAuthenticatedMiddleware implements IMiddleware {
  async handle(
    request: EnsureAuthenticatedMiddlewareRequest,
  ): Promise<HttpResponse> {
    try {
      const { accessToken } = request;

      if (accessToken) {
        try {
          const [, token] = accessToken.split(' ');
          const decoded = decode(token) as DecodedJwt;

          return ok({ userId: decoded.sub });
        } catch (err) {
          return forbidden(new AccessDeniedError());
        }
      }

      return forbidden(new AccessDeniedError());
    } catch (error) {
      return fail(error as Error);
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace AuthMiddleware {
  export type Request = {
    accessToken?: string;
  };
}
