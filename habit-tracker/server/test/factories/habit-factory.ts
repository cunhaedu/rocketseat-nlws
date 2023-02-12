import { Habit, HabitProps } from '@application/entities/habit';
import { makeHabitWeekDay } from './habit-week-day-factory';

type Override = Partial<HabitProps>;

export function makeHabit(override: Override = {}) {
  return new Habit({
    title: 'Drink water',
    createdAt: new Date(),
    weekDays: [makeHabitWeekDay()],
    ...override,
  });
}
