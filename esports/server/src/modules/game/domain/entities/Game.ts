import { randomUUID } from 'node:crypto';

import { Ad } from './Ad';

export type GameProps = {
  id: string;
  title: string;
  bannerUrl: string;
  ads: Ad[];
}

export class Game {
  id: string;

  title: string;

  bannerUrl: string;

  ads?: Ad[];

  constructor() {
    if (!this.id) {
      this.id = randomUUID();
    }
  }
}
