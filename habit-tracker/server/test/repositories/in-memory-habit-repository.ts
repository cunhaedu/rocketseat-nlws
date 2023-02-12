import { Habit } from '@application/entities/habit';
import { HabitRepository } from '@application/repositories/habit-repository';

export class InMemoryHabitRepository implements HabitRepository {
  habits: Habit[] = [];

  async create(habit: Habit): Promise<void> {
    this.habits.push(habit);
  }
}
