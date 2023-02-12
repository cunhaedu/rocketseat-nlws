import { GuessDTO } from '../../guesses/dtos/GuessDTO';

export interface GameDTO {
  id: string;
  date: Date;
  firstTeamCountryCode: string;
  secondTeamCountryCode: string;

  guesses: GuessDTO[];
}
