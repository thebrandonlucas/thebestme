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
  if (Object.keys(days).length === 0 || !days) {
    return {} 
  }
  const dateTimes: DateTime[] = Object.keys(days).map(day => DateTime.fromISO(day));
  const mostRecentDate = DateTime.max(...dateTimes).toISODate()
  return days[mostRecentDate];
}

/**
 * Returns the most recent ISO date given days
 * @param days 
 * @returns 
 */
export function getMostRecentDate(days: IDayType): string {
  // If days are empty or undefined, return an impossibly old date
  if (Object.keys(days).length === 0 || !days) {
    return '1970-01-01'
  }
  const dateTimes: DateTime[] = Object.keys(days).map(day => DateTime.fromISO(day));
  const mostRecentDate = DateTime.max(...dateTimes).toISODate()
  return days[mostRecentDate].date;
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