import { Colors } from '../constants';
import { MoodToColor } from '../constants/MoodToColor';
import {
  CalendarDataType,
  DayType,
  ICalendarDataType,
  IDayType,
} from '../types';
import { getMoodMode } from './mood';

/**
 * Return the right props for the Calendar component from 'react-native-calendars'
 * depending whether a day is currently selected and the mood data
 * @param selectedDay - The currently selected date string in ISO format (YYYY-MM-DD)
 * @param days - The days for which there is calendar data
 * @returns - Calendar data props to be passed to Calendar component
 */
export default function getCalendarData(
  selectedDay: string,
  days: IDayType
): ICalendarDataType {
  let calendarData: ICalendarDataType = {};
  let currentCalendarData: CalendarDataType = {};
  // Set calendar display data according to dates
  for (const date in days) {
    const currentDay: DayType = days[date];
    currentCalendarData = {
      selected: true,
      color:
        selectedDay === date
          ? Colors.iosBlue
          : MoodToColor[getMoodMode(currentDay.mood)] || 'transparent',
      startingDay: true,
      endingDay: true,
    };
    calendarData[date] = currentCalendarData;
  }

  // If selectedDate has data associated with it, add it to calendar props
  calendarData[selectedDay] = {
    selected: true,
    color: Colors.iosBlue,
    startingDay: true,
    endingDay: true,
  };
  return calendarData;
}
