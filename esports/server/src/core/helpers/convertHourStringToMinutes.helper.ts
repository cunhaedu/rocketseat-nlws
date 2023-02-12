export function convertHourStringToMinutes(hourWithMinutes: string): number {
  const [hours, minutes] = hourWithMinutes.split(':').map(Number);

  return hours * 60 + minutes;
}
