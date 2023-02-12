import { GuessDTO } from '../dtos/GuessDTO';

export type CreateGuess = {
  firstTeamPoints: number;
  secondTeamPoints: number;
  participantId: string;
  gameId: string;
}

export interface GuessRepository {
  count(): Promise<number>;
  findByParticipantAndGameId(
    participantId: string,
    gameId: string,
  ): Promise<GuessDTO | null>;
  create(data: CreateGuess): Promise<void>;
}
