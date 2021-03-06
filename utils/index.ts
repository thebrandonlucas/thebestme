import { DateAndTime } from './../types';
import { DateTime } from "luxon";

// TODO: refactor getDateString and just use Luxon
/** 
 * Gets date as ISO string and returns formatted Date
 * @param {string} isoDate - date string in ISO format
 */
export default function getDateString(isoDate?: string): DateAndTime {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const dayNames = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const jsDate = isoDate ? DateTime.fromISO(isoDate).toJSDate() : new Date();
  const day = jsDate.getDate();
  const dayOfWeek = dayNames[jsDate.getDay()];
  const month = jsDate.getMonth();
  const monthName = monthNames[month];
  const year = jsDate.getFullYear();
  const date = `${dayOfWeek}, ${monthName} ${day}, ${year}`;
  const time = jsDate.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
  return { date, time };
}

/**
 * Gets the date portion of the ISO date string for the current date
 */
export function getTodayDateStringISO() {
  return new Date().toISOString().substring(0, 10);
}

/**
 * Gets the date portion of the ISO date string for a given ISO String isoString
 * @param {string} isoString - string in YYYY-MM-DD format
 */
 export function getDateFromISOString(isoString: string) {
  return isoString.substring(0, 10);
}


/**
 * Gets a percentage given a particular frequency and a total
 */
export function getPercentage(numerator: number, denominator: number): number {
  if (denominator === 0) {
    return 0;
  }
  const percentComplete = 100 * (numerator / denominator);
  return Math.round(percentComplete * 100) / 100;
}
