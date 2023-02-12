import { Habit } from '@application/entities/habit';
import { HabitRepository } from '@application/repositories/habit-repository';
import { retrieveWeekDayFromDate } from '@helpers/date.helpers';
import { Injectable } from '@nestjs/common';
import { PrismaHabitMapper } from '../mappers/prisma-habit-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaHabitRepository implements HabitRepository {
  constructor(private prismaService: PrismaService) {}

  async findManyByDate(date: Date): Promise<Habit[]> {
    const weekDay = retrieveWeekDayFromDate(date);

    const habits = await this.prismaService.habit.findMany({
      where: {
        createdAt: {
          lte: date,
        },
        habitWeekDays: {
          some: {
            weekDay,
          },
        },
      },
    });

    return habits.map(PrismaHabitMapper.toDomain);
  }

  async create(habit: Habit): Promise<void> {
    await this.prismaService.habit.create({
      data: {
        id: habit.id,
        title: habit.title,
        createdAt: habit.createdAt,
        habitWeekDays: {
          create: habit.weekDays.map((weekDay) => ({
            id: weekDay.id,
            weekDay: weekDay.weekDay,
          })),
        },
      },
    });
  }
}
