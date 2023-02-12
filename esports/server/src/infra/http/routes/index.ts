import { Router } from 'express';
import { gameRoutes } from './games.routes';

const routes = Router();

routes.use(gameRoutes);

export { routes };
