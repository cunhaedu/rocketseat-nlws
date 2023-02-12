import { Injectable } from '@nestjs/common';

import { DayRepository } from '@application/repositories/day-repository';
import { Day } from '@application/entities/day';

import { PrismaService } from '../prisma.service';
import { PrismaDayMapper } from '../mappers/prisma-day-mapper';
import { retrieveOnlyDate } from '@helpers/date.helpers';

@Injectable()
export class PrismaDayRepository implements DayRepository {
  constructor(private prismaService: PrismaService) {}

  async findOneByDate(date: Date): Promise<Day | null> {
    const parsedDate = retrieveOnlyDate(date);

    const day = await this.prismaService.day.findUnique({
      where: {
        date: parsedDate,
      },
      include: {
        dayHabits: true,
      },
    });

    if (!day) return null;

    return PrismaDayMapper.toDomain(day);
  }
}
