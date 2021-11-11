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
  let tempCalendarData: ICalendarDataType = {};
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
    tempCalendarData[date] = currentCalendarData;
  }

  // Check if the selected date has data associated with it
  if (isSelectedDateInDays) {
    tempCalendarData[selectedDay] = {
      selected: true,
      color: Colors.iosBlue,
      startingDay: true,
      endingDay: true,
    };
  }
  return tempCalendarData;
}
