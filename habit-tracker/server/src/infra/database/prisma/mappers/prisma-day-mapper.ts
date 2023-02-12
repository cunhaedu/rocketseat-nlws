import {
  Day as PrismaClientDay,
  DayHabit as PrismaClientDayHabit,
} from '@prisma/client';

import { Day } from '@application/entities/day';

type PrismaDay = PrismaClientDay & {
  dayHabits?: PrismaClientDayHabit[];
};

export class PrismaDayMapper {
  static toDomain(raw: PrismaDay): Day {
    return new Day(
      {
        date: raw.date,
        habitIds: raw.dayHabits
          ? raw.dayHabits.map((dayHabit) => dayHabit.habitId)
          : [],
      },
      raw.id,
    );
  }
}
