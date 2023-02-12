import { ParticipantDTO } from '../dtos/ParticipantDTO';

export type CreateParticipant = {
  userId: string;
  poolId: string;
}

export interface ParticipantRepository {
  create(data: CreateParticipant): Promise<void>;
  findByPoolAndUserId(
    poolId: string,
    userId: string
  ): Promise<ParticipantDTO | null>;
}
