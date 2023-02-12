import { Replace } from '@helpers/replace';
import { randomUUID } from 'node:crypto';
import { Habit } from './habit';

export interface HabitWeekDayProps {
  weekDay: number;
  habit?: Habit;
}

export class HabitWeekDay {
  private _id: string;

  private props: HabitWeekDayProps;

  constructor(
    props: Replace<HabitWeekDayProps, { createdAt?: Date }>,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
    };
  }

  public get id(): string {
    return this._id;
  }

  public set weekDay(weekDay: number) {
    this.props.weekDay = weekDay;
  }

  public get weekDay(): number {
    return this.props.weekDay;
  }

  public set habit(habit: Habit) {
    this.props.habit = habit;
  }

  public get habit(): Habit {
    return this.props.habit;
  }
}
