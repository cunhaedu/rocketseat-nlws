import { ParticipantDTO } from './ParticipantDTO';

export interface PoolDTO {
  id: string;
  title: string;
  code: string;
  createdAt: Date;
  ownerId: string | null;

  participants?: ParticipantDTO[];
}
