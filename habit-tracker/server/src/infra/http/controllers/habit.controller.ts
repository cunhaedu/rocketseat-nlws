import { Body, Controller, Get, Post, Query } from '@nestjs/common';

import { RegisterHabit } from '@application/use-cases/habits/register-habit/register-habit';

import { FindHabitsByDateBody } from '../dtos/find-habits-by-date-body';
import { CreateHabitBody } from '../dtos/create-habit-body';
import { FindHabitByDay } from '@application/use-cases/habits/find-habits-by-day/find-habit-by-day';

@Controller('habits')
export class HabitController {
  constructor(
    private registerHabit: RegisterHabit,
    private findHabitsByDate: FindHabitByDay,
  ) {}

  @Post()
  async register(@Body() body: CreateHabitBody) {
    const { title, weekDays } = body;

    await this.registerHabit.execute({ title, weekDays });
  }

  @Get('/days')
  async findByDate(@Query() query: FindHabitsByDateBody) {
    const { date } = query;

    return this.findHabitsByDate.execute({ date });
  }
}
