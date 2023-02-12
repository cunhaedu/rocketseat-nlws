import { randomUUID } from 'node:crypto';

export interface DayProps {
  date: Date;
  habitIds: string[];
}

export class Day {
  private _id: string;

  private props: DayProps;

  constructor(props: DayProps, id?: string) {
    this._id = id ?? randomUUID();
    this.props = props;
  }

  public get id(): string {
    return this._id;
  }

  public set date(date: Date) {
    this.props.date = date;
  }

  public get date(): Date {
    return this.props.date;
  }

  public set habitIds(habitIds: string[]) {
    this.props.habitIds = habitIds;
  }

  public get habitIds(): string[] {
    return this.props.habitIds;
  }
}
