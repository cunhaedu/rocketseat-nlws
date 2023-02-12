import { Module } from '@nestjs/common';

import { FindHabitByDay } from '@application/use-cases/habits/find-habits-by-day/find-habit-by-day';
import { RegisterHabit } from '@application/use-cases/habits/register-habit/register-habit';

import { HabitRepository } from '@application/repositories/habit-repository';
import { DayRepository } from '@application/repositories/day-repository';

import { DatabaseModule } from '@infra/database/database.module';
import { HabitController } from './controllers/habit.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [HabitController],
  providers: [
    {
      provide: RegisterHabit,
      useFactory: (HabitRepository: HabitRepository) => {
        return new RegisterHabit(HabitRepository);
      },
      inject: [HabitRepository],
    },
    {
      provide: FindHabitByDay,
      useFactory: (
        HabitRepository: HabitRepository,
        dayRepository: DayRepository,
      ) => {
        return new FindHabitByDay(HabitRepository, dayRepository);
      },
      inject: [HabitRepository, DayRepository],
    },
  ],
})
export class HttpModule {}
