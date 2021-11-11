import getCalendarData from '../../utils/getCalendarData';
import { getMoodMode } from '../../utils/mood';
import { calendarDataMultipleDaysWithSelectedDay, calendarDataSelectedDayOnly } from '../../__fixtures__/calendarData';
import { daysContainingSelectedDay, singleDayContainingSelectedDay } from '../../__fixtures__/days';

describe('Utility Functions', () => {
  it('should get the most common (average/mode) mood from a list of moods', () => {
    expect(getMoodMode(['Happy'])).toBe('Happy');
    expect(getMoodMode(['Happy', 'Sad'])).toBe('Sad');
    expect(getMoodMode(['Happy', 'Sad', 'Neutral'])).toBe('Neutral');
    expect(getMoodMode(['Happy', 'Sad', 'Sad', 'Neutral'])).toBe('Sad');
    expect(getMoodMode(['Sad', 'Sad', 'Happy', 'Neutral'])).toBe('Sad');
    expect(getMoodMode(['Happy', 'Sad', 'Neutral', 'Neutral'])).toBe('Neutral');
    expect(getMoodMode([])).toBe('No mood provided');
    expect(getMoodMode(['Fake Mood'])).toBe('Invalid mood found');
  });

  // Tests calendar day logic for DataScreen (is it getting the right days?)
  it('should get calendar data', () => {
    expect(getCalendarData('2021-01-01', singleDayContainingSelectedDay)).toEqual(
      calendarDataSelectedDayOnly
    );
    expect(getCalendarData('2021-01-02', daysContainingSelectedDay)).toEqual(
      calendarDataMultipleDaysWithSelectedDay
    );
  });
});
