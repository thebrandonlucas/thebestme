import { DateTime } from '../types';

/** 
 * Gets date as ISO string and returns formatted Date
 * @param {string} isoDate - date string in ISO format
 */
export default function getDateString(isoDate: string): DateTime {
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
  const day = new Date().getDate();
  const dayOfWeek = dayNames[new Date().getDay()];
  const month = new Date().getMonth();
  const monthName = monthNames[month];
  const year = new Date().getFullYear();
  const date = `${dayOfWeek}, ${monthName} ${day}, ${year}`;
  const time = new Date().toLocaleString('en-US', {
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