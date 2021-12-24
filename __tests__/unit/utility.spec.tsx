import getCalendarData from '../../utils/getCalendarData';
import { getMoodMode } from '../../utils/mood';
import {
  calendarDataMultipleDaysWithSelectedDay,
  calendarDataSelectedDayOnly,
} from '../../__fixtures__/calendarData';
import {
  daysContainingSelectedDay,
  singleDayContainingSelectedDay,
} from '../../__fixtures__/days';

describe('Utility Functions', () => {
  it('should get the most common (average/mode) mood from a list of moods', () => {
    const testCases: [string[], string][] = [
      [['Great'], 'Great'],
      [['Great', 'Not Good'], 'Not Good'],
      [['Great', 'Not Good', 'Okay'], 'Okay'],
      [['Great', 'Not Good', 'Not Good', 'Okay'], 'Not Good'],
      [['Not Good', 'Not Good', 'Great', 'Okay'], 'Not Good'],
      [['Great', 'Not Good', 'Okay', 'Okay'], 'Okay'],
      [[], 'No mood provided'],
      [['Fake Mood'], 'Invalid mood found'],
    ];
    for (let i = 0; i < testCases.length; i++) {
      const moodsList = testCases[i][0];
      const mostCommonMood = testCases[i][1];
      expect(getMoodMode(moodsList)).toBe(mostCommonMood);
    }
  });

  // Tests calendar day logic for DataScreen (is it getting the right days?)
  it('should get calendar data', () => {
    const testCases = [
      ['2021-01-01', ]
    ]
    expect(
      getCalendarData('2021-01-01', singleDayContainingSelectedDay)
    ).toEqual(calendarDataSelectedDayOnly);
    expect(getCalendarData('2021-01-01', daysContainingSelectedDay)).toEqual(
      calendarDataMultipleDaysWithSelectedDay
    );
  });
});
