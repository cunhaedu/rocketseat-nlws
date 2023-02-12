import { Habit } from '@application/entities/habit';
import { HabitWeekDay } from '@application/entities/habitWeekDay';
import { HabitRepository } from '@application/repositories/habit-repository';

interface RegisterHabitRequest {
  title: string;
  weekDays: number[];
}

export class RegisterHabit {
  constructor(private habitRepository: HabitRepository) {}

  async execute(request: RegisterHabitRequest): Promise<void> {
    const { title, weekDays } = request;

    const habit = new Habit({
      title,
      weekDays: weekDays.map((weekDay) => new HabitWeekDay({ weekDay })),
    });

    await this.habitRepository.create(habit);
  }
}
