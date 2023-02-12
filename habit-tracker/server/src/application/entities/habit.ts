import { randomUUID } from 'node:crypto';

import { getCurrentDay } from '@helpers/date.helpers';
import { Replace } from '@helpers/replace';
import { HabitWeekDay } from './habitWeekDay';

export interface HabitProps {
  title: string;
  createdAt: Date;
  weekDays: HabitWeekDay[];
}

export class Habit {
  private _id: string;

  private props: HabitProps;

  constructor(props: Replace<HabitProps, { createdAt?: Date }>, id?: string) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? getCurrentDay(),
    };
  }

  public get id(): string {
    return this._id;
  }

  public set title(title: string) {
    this.props.title = title;
  }

  public get title(): string {
    return this.props.title;
  }

  public set weekDays(weekDays: HabitWeekDay[]) {
    this.props.weekDays = weekDays;
  }

  public get weekDays(): HabitWeekDay[] {
    return this.props.weekDays;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }
}
