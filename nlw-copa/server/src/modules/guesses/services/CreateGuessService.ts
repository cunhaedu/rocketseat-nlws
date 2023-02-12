import { inject, injectable } from 'tsyringe';

import { ParticipantRepository } from '../../pools/repositories/ParticipantRepository';
import { GameRepository } from '../../games/repositories/GameRepository';
import { GuessRepository } from '../repositories/GuessRepository';

type CreateGuessRequest = {
  gameId: string;
  poolId: string;
  userId: string;
  firstTeamPoints: number;
  secondTeamPoints: number;
}

@injectable()
export class CreateGuessService {
  constructor(
    @inject('GuessRepository')
    private guessRepository: GuessRepository,

    @inject('ParticipantRepository')
    private participantRepository: ParticipantRepository,

    @inject('GameRepository')
    private gameRepository: GameRepository
  ) {}

  async execute({
    secondTeamPoints,
    firstTeamPoints,
    gameId,
    poolId,
    userId,
  }: CreateGuessRequest): Promise<any> {
    const participant = await this.participantRepository.findByPoolAndUserId(
      poolId,
      userId
    );

    if (!participant) {
      throw new Error("You're not allowed to create a guess inside this pool!");
    }

    const guess = await this.guessRepository.findByParticipantAndGameId(
      participant.id,
      gameId
    )

    if (guess) {
      throw new Error('You already sent a guess to this game on this pool!');
    }

    const game = await this.gameRepository.findById(gameId);

    if (!game) {
      throw new Error('Game not found!');
    }

    if (game.date < new Date()) {
      throw new Error('You cannot send guesses after the game date!');
    }

    await this.guessRepository.create({
      secondTeamPoints,
      firstTeamPoints,
      participantId: participant.id,
      gameId,
    });
  }
}
