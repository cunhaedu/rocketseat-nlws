import { GameProps } from '../../../modules/game/domain/entities/Game';

export const gamesMock: GameProps[] = [
  {
    id: '00bd1ce9-5807-4efd-93ee-cf841a51ccc2',
    title: 'Among Us',
    bannerUrl: 'https://static-cdn.jtvnw.net/ttv-boxart/510218_IGDB-285x380.jpg',
    ads: [
      {
        id: 'b22f5f63-5eef-4e1d-9bce-3a2ac76670b2',
        name: 'Eduardo Assunção',
        yearsPlaying: 1,
        discord: 'Eduardo Assunção#9854',
        weekDays: '6,0',
        hourStart: 15,
        hourEnd: 16,
        useVoiceChannel: false,
        createdAt: new Date(),
      }
    ]
  },
  {
    id: '0d64f48e-807c-43f3-8f6f-0ab2672d0213',
    title: 'World of Warcraft',
    bannerUrl: 'https://static-cdn.jtvnw.net/ttv-boxart/18122-285x380.jpg',
    ads: [
      {
        id: '7fd07589-341b-4ef6-b800-0c04a4c9cbe6',
        name: 'Eduardo Assunção',
        yearsPlaying: 1,
        discord: 'Eduardo Assunção#9854',
        weekDays: '6,0',
        hourStart: 15,
        hourEnd: 16,
        useVoiceChannel: false,
        createdAt: new Date(),
      }
    ]
  }
]
