import { NextFunction, Request, Response, Router } from 'express';

import github from '@config/github';
import { adaptMiddleware } from '@core/adapters/ExpressMiddlewareAdapter';

import { authenticateUserController } from '@modules/user/useCases/AuthenticateUser';
import { createMessageController } from '@modules/message/useCases/CreateMessage';
import { listMessageController } from '@modules/message/useCases/ListMessage';
import { userProfileController } from '@modules/user/useCases/UserProfile';

import { makeEnsureAuthenticatedMiddleware } from '../factories/middlewares/EnsureAuthenticatedMiddlewareFactory';

const auth = adaptMiddleware(makeEnsureAuthenticatedMiddleware());

const routes = Router();

routes.post('/authenticate', (req, res, next) =>
  authenticateUserController.handle(req, res, next),
);

routes.get(
  '/profile',
  [auth],
  (req: Request, res: Response, next: NextFunction) =>
    userProfileController.handle(req, res, next),
);

routes.post(
  '/messages',
  [auth],
  (req: Request, res: Response, next: NextFunction) =>
    createMessageController.handle(req, res, next),
);

routes.get('/messages', (req, res, next) =>
  listMessageController.handle(req, res, next),
);

routes.get('/github', (req, res) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${github.CLIENT_ID}`,
  );
});

routes.get('/signin/callback', (req, res) => {
  const { code } = req.query;

  return res.json(code);
});

export default routes;
