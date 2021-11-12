import { Colors } from '../constants';
import { MoodToColor } from '../constants/MoodToColor';
import {
  CalendarDataType,
  DayType,
  ICalendarDataType,
  IDayType,
} from '../types';
import { getMoodMode } from './mood';

export default function getCalendarData(
  selectedDay: string,
  days: IDayType
): ICalendarDataType {
  let calendarData: ICalendarDataType = {};
  let currentCalendarData: CalendarDataType = {};
  let isSelectedDateInDays = false;
  // Set calendar display data according to dates
  for (const date in days) {
    const currentDay: DayType = days[date];
    if (selectedDay === date) {
      isSelectedDateInDays = true;
    }
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

  // If selectedDate has data associated with it, add it to calendar data
    calendarData[selectedDay] = {
      selected: true,
      color: Colors.iosBlue,
      startingDay: true,
      endingDay: true,
    };
  return calendarData;
}
