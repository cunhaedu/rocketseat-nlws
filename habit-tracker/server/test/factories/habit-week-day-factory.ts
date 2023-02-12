import {
  HabitWeekDay,
  HabitWeekDayProps,
} from '@application/entities/habitWeekDay';

type Override = Partial<HabitWeekDayProps>;

export function makeHabitWeekDay(override: Override = {}) {
  return new HabitWeekDay({
    weekDay: 1,
    ...override,
  });
}
