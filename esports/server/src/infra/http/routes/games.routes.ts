import { Router } from 'express';

import { CreateGameAdController } from '../../../modules/game/useCases/CreateGameAd/CreateGameAdController';
import { FindGameAdsController } from '../../../modules/game/useCases/FindGameAds/FindGameAdsController';
import { ListGamesController } from '../../../modules/game/useCases/ListGames/ListGamesController';

const gameRoutes = Router();

const listGamesController = new ListGamesController();
const findGameAdsController = new FindGameAdsController();
const createGameAdController = new CreateGameAdController();

gameRoutes.get('/games', listGamesController.handle);

gameRoutes.get('/games/:gameId/ads', findGameAdsController.handle);
gameRoutes.post('/games/:gameId/ads', createGameAdController.handle);

export { gameRoutes }
