import { Habit } from '@application/entities/habit';

export abstract class HabitRepository {
  abstract create(habit: Habit): Promise<void>;
  abstract findManyByDate(date: Date): Promise<Habit[]>;
}
