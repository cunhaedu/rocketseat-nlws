import { inject, injectable } from 'tsyringe';

import { convertHourStringToMinutes } from '../../../../core/helpers/convertHourStringToMinutes.helper';
import { GameRepository } from '../../domain/repositories/GameRepository';
import { AdRepository } from '../../domain/repositories/AdRepository';
import { Ad } from '../../domain/entities/Ad';

type CreateGameAdRequest = {
  name: string;
  yearsPlaying: number;
  discord: string;
  weekDays: number[];
  hourStart: string;
  hourEnd: string;
  useVoiceChannel: boolean;
}

@injectable()
export class CreateGameAd {
  constructor(
    @inject('GameRepository')
    private gameRepository: GameRepository,

    @inject('AdRepository')
    private adRepository: AdRepository
  ) {}

  async execute(gameId: string, data: CreateGameAdRequest): Promise<void> {
    const game = await this.gameRepository.find(gameId);

    if (!game) {
      throw new Error(`The game with ID ${gameId} does not exists`);
    }

    await this.adRepository.create({
      ...data,
      gameId,
      weekDays: data.weekDays.join(','),
      hourEnd: convertHourStringToMinutes(data.hourEnd),
      hourStart: convertHourStringToMinutes(data.hourStart),
    } as Ad);
  }
}
