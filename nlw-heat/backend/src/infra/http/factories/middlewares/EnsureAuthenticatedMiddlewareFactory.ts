import { IMiddleware } from '@core/infra/Middleware';
import { EnsureAuthenticatedMiddleware } from '@infra/http/middlewares/EnsureAuthenticationMiddleware';

export function makeEnsureAuthenticatedMiddleware(): IMiddleware {
  const ensureAuthenticatedMiddleware = new EnsureAuthenticatedMiddleware();

  return ensureAuthenticatedMiddleware;
}
