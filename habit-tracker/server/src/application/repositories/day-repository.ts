import { Day } from '@application/entities/day';

export abstract class DayRepository {
  abstract findOneByDate(date: Date): Promise<Day | null>;
}
