import dayjs from 'dayjs';

export function getCurrentDay(): Date {
  return dayjs().startOf('day').toDate();
}

export function retrieveWeekDayFromDate(date: Date): number {
  return dayjs(date).get('day');
}

export function retrieveOnlyDate(date: Date): Date {
  return dayjs(date).startOf('day').toDate();
}
