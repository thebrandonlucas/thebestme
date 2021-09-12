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
