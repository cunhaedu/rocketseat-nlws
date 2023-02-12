import { injectable } from 'tsyringe';

import { CreateGuess, GuessRepository } from '../../../repositories/GuessRepository';
import { prisma } from '../../../../../infra/prisma/client';
import { GuessDTO } from '../../../dtos/GuessDTO';

@injectable()
export class PrismaGuessRepository implements GuessRepository {
  private repository;

  constructor() {
    this.repository = prisma.guess;
  }

  async count(): Promise<number> {
    return this.repository.count();
  }

  async findByParticipantAndGameId(
    participantId: string,
    gameId: string,
  ): Promise<GuessDTO | null> {
    return this.repository.findUnique({
      where: {
        participantId_gameId: {
          participantId,
          gameId,
        }
      }
    })
  }

  async create({
    secondTeamPoints,
    firstTeamPoints,
    participantId,
    gameId,
  }: CreateGuess): Promise<void> {
    await this.repository.create({
      data: {
        secondTeamPoints,
        firstTeamPoints,
        participantId,
        gameId,
      }
    })
  }
}
