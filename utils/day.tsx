import { DateTime } from 'luxon';
import { DayType, IDayType } from '../types';

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

/**
 * Gets the last day with data. If that's today, then returns object for today
 * @param days
 */
export function getMostRecentDay(days: IDayType): DayType {
  const dates = Object.keys(days);
  const lastDate = dates[dates.length - 1];
  return days[lastDate];
}

/**
 * Gets the most recent days up to the past 7 days
 * @param days
 */
export function getDaysPastWeek(days: IDayType): IDayType {
  const dateWeekAgo = DateTime.now().minus({week: 1}).toISODate();
  const daysPastWeek = getDaysInTimeRange(days, dateWeekAgo, DateTime.now().toISODate())
  return daysPastWeek;
}