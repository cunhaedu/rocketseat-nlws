import { HabitRepository } from '@application/repositories/habit-repository';
import { DayRepository } from '@application/repositories/day-repository';

interface FindHabitByDayRequest {
  date: Date;
}

interface FindHabitByDayResponse {
  id: string;
  title: string;
  isDone: boolean;
}

export class FindHabitByDay {
  constructor(
    private habitRepository: HabitRepository,
    private dayRepository: DayRepository,
  ) {}

  async execute({
    date,
  }: FindHabitByDayRequest): Promise<FindHabitByDayResponse[]> {
    const possibleHabits = await this.habitRepository.findManyByDate(date);
    const doneHabits = await this.dayRepository.findOneByDate(date);

    return possibleHabits.map((habit) => ({
      id: habit.id,
      title: habit.title,
      isDone:
        !!doneHabits &&
        doneHabits.habitIds.some((habitId) => habitId === habit.id),
    }));
  }
}
