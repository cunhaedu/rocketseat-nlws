import {
  HabitWeekDays as PrismaClientHabitWeekDays,
  Habit as PrismaClientHabit,
} from '@prisma/client';

import { HabitWeekDay } from '@application/entities/habitWeekDay';
import { Habit } from '@application/entities/habit';

type PrismaHabit = PrismaClientHabit & {
  habitWeekDays?: PrismaClientHabitWeekDays[];
};

export class PrismaHabitMapper {
  static toDomain(raw: PrismaHabit): Habit {
    return new Habit(
      {
        title: raw.title,
        createdAt: raw.createdAt,
        weekDays:
          raw.habitWeekDays &&
          raw.habitWeekDays.map(
            (weekDay) =>
              new HabitWeekDay({ weekDay: weekDay.weekDay }, weekDay.id),
          ),
      },
      raw.id,
    );
  }
}
