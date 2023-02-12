import { Module } from '@nestjs/common';

import { DayRepository } from '@application/repositories/day-repository';
import { HabitRepository } from '@application/repositories/habit-repository';

import { PrismaHabitRepository } from './prisma/repositories/prisma-habit-repository';
import { PrismaDayRepository } from './prisma/repositories/prisma-day-repository';
import { PrismaService } from './prisma/prisma.service';

@Module({
  providers: [
    PrismaService,
    {
      provide: HabitRepository,
      useClass: PrismaHabitRepository,
    },
    {
      provide: DayRepository,
      useClass: PrismaDayRepository,
    },
  ],
  exports: [HabitRepository, DayRepository],
})
export class DatabaseModule {}
