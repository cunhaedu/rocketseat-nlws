import { inject, injectable } from 'tsyringe';

import { convertMinutesToHours } from '../../../../core/helpers/convertMinutesToHours.helper';
import { AdRepository } from '../../domain/repositories/AdRepository';
import { Ad } from '../../domain/entities/Ad';

type FindGameAdsResponse = Omit<Ad, 'weekDays' | 'hourEnd' | 'hourStart'> & {
  weekDays: number[];
  hourStart: string;
  hourEnd: string;
}

@injectable()
export class FindGameAds {
  constructor(
    @inject('AdRepository')
    private adRepository: AdRepository
  ) {}

  async execute(gameId: string): Promise<FindGameAdsResponse[]> {
    const ads = await this.adRepository.listByGameId(gameId);

    return this.formatGameAds(ads);
  }

  private formatGameAds(ads: Ad[]): FindGameAdsResponse[] {
    return ads.map(ad => ({
      ...ad,
      weekDays: ad.weekDays.split(',').map(weekDay => parseInt(weekDay, 10)),
      hourEnd: convertMinutesToHours(ad.hourEnd),
      hourStart: convertMinutesToHours(ad.hourStart),
    }))
  }
}
