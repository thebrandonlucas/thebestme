import { DateTime } from 'luxon';
import { IDayType } from '../types';

export function getDaysInTimeRange(
  days: IDayType,
  startDatetime: string,
  endDatetime: string
): IDayType {
  let daysInRange: IDayType = {};
  for (const date in days) {
    // TODO: convert days to datetimes
    const day = days[date];
    if (isDatetimeInRange(startDatetime, endDatetime, day.date)) {
      daysInRange[day.date] = day;
    }
  }
  return daysInRange;
}

export function isDatetimeInRange(
  startDatetimeISO: string,
  endDatetimeISO: string,
  compareDatetimeISO: string
): boolean {
  const [startDate, endDate, compareDate] = [
    DateTime.fromISO(startDatetimeISO),
    DateTime.fromISO(endDatetimeISO),
    DateTime.fromISO(compareDatetimeISO),
  ];
  return startDate <= compareDate && compareDate <= endDate;
}
