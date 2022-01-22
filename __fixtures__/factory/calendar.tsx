import { MoodToColor } from '../../constants/MoodToColor';
import { CalendarDataType, ICalendarDataType, IDayType } from '../../types';
import { getMoodMode } from '../../utils/mood';

/**
 * Generate calendar data for the react-native-calendar package
 * @param days - Days
 * @param overrides {Optional} - overrides for particular fields to not generate randomly
 * @returns Calendar Data
 */
export function calendarFactory(
  days: IDayType,
  overrides: CalendarDataType = {}
): ICalendarDataType {
  let calendarData: ICalendarDataType = {};

  const calendarDefaults: CalendarDataType = {
    startingDay: true,
    endingDay: true,
    selected: true,
    color: '',
  };

  for (const date in days) {
    for (const calendarProp in calendarDefaults) {
      const isOverridePropNotNull = overrides && overrides[calendarProp];
      if (calendarData[date] && calendarProp === 'color') {
        calendarData[date].color = isOverridePropNotNull
          ? overrides.color
          : MoodToColor[getMoodMode(days[date].mood)];
      } else if (!calendarData[date]) {
        calendarData[date] = isOverridePropNotNull
          ? { [calendarProp]: overrides[calendarProp] }
          : { [calendarProp]: calendarDefaults[calendarProp] };
      } else {
        calendarData[date][calendarProp] = isOverridePropNotNull
          ? overrides[calendarProp]
          : calendarDefaults[calendarProp];
      }
    }
  }
  return calendarData;
}
