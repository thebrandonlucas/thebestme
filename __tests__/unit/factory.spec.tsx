import { DateTime } from 'luxon';
import { Colors } from '../../constants';
import { MoodToColor } from '../../constants/MoodToColor';
import {
  CalendarDataType,
  IHabitType,
  OptionalCbtJournalEntryType,
  OptionalHabitType,
  ValidMoods,
} from '../../types';
import { getMoodMode } from '../../utils/mood';
import { calendarFactory } from '../../__fixtures__/factory/calendar';
import { dayFactory } from '../../__fixtures__/factory/day';
import { habitFactory } from '../../__fixtures__/factory/habit';
import { cbtFactory } from '../../__fixtures__/factory/journal/cbt';
import { moodFactory } from '../../__fixtures__/factory/mood';
import { TableTest } from '../../__fixtures__/test-types';

describe('Habit factory', () => {
  test('should have all habit properties of the right type for each habit', () => {
    const habitPropTypes = {
      id: 'string',
      checked: 'boolean',
      deleted: 'boolean',
      text: 'string',
    };
    const habits: IHabitType = habitFactory();

    // Check that for each factory-produced object,
    // all the keys are present and of the right type
    for (const habitProp in habitPropTypes) {
      for (const habitId in habits) {
        const typeToCheck = habitPropTypes[habitProp];
        const currentHabitProp = habits[habitId][habitProp];
        expect(typeof currentHabitProp).toBe(typeToCheck);
      }
    }
  });

  test('should return correct number of habits', () => {
    expect(Object.keys(habitFactory()).length).toBeGreaterThan(0);
    expect(Object.keys(habitFactory()).length).toBeLessThan(11);
    expect(Object.keys(habitFactory(20)).length).toBe(20);
    expect(Object.keys(habitFactory(0)).length).toBe(0);
    expect(Object.keys(habitFactory(100)).length).toBe(100);
  });

  test('should override correct habit properties', () => {
    // override "checked" property
    const checkedFalseOverrides: OptionalHabitType = {
      checked: false,
    };
    const checkedFalseHabits: IHabitType = habitFactory(
      undefined,
      checkedFalseOverrides
    );
    for (const id in checkedFalseHabits) {
      expect(checkedFalseHabits[id].checked).toBe(false);
    }

    // override "deleted" property
    const deletedTrueOverrides: OptionalHabitType = {
      deleted: true,
    };
    const deletedTrueHabits: IHabitType = habitFactory(
      undefined,
      deletedTrueOverrides
    );
    for (const id in deletedTrueHabits) {
      expect(deletedTrueHabits[id].deleted).toBe(true);
    }

    // override "text" property
    const textOverride: OptionalHabitType = {
      text: 'Fake Habit',
    };
    const textOverrideHabits: IHabitType = habitFactory(
      undefined,
      textOverride
    );
    for (const id in textOverrideHabits) {
      expect(textOverrideHabits[id].text).toBe('Fake Habit');
    }
  });
});

describe('Day factory', () => {
  const habits = habitFactory();
  test('should return the correct number of days', () => {
    expect(Object.keys(dayFactory(habits)).length).toBeGreaterThan(0);
    expect(Object.keys(dayFactory(habits)).length).toBeLessThan(11);
    expect(Object.keys(dayFactory(habits, 1)).length).toBe(1);
    expect(Object.keys(dayFactory(habits, 10)).length).toBe(10);
    expect(Object.keys(dayFactory(habits, 100)).length).toBe(100);
    expect(Object.keys(dayFactory(habits, -1)).length).toBe(0);
    expect(Object.keys(dayFactory(habits, 0)).length).toBe(0);
  });

  test('should have finished habits and remaining habits add up to habitCount for each day', () => {
    const testCases = [
      dayFactory(habitFactory()),
      dayFactory(habitFactory(), 10),
      dayFactory(habitFactory(), 0),
      dayFactory(habitFactory(), 1),
      dayFactory(habitFactory(), undefined, true),
      dayFactory(habitFactory(), 10, true),
      dayFactory(habitFactory(1)),
      dayFactory(habitFactory(10), 10),
      dayFactory(habitFactory(1), 0),
      dayFactory(habitFactory(), 1),
      dayFactory(habitFactory(5), undefined, true),
      dayFactory(habitFactory(5), 10, true),
    ];

    for (const daysTestCase of testCases) {
      for (const id in daysTestCase) {
        expect(
          daysTestCase[id].finishedHabitIds.length +
            daysTestCase[id].remainingHabitIds.length
        ).toBe(daysTestCase[id].habitCount);
      }
    }
  });

  test('should be sequential when sequential is specified, and random otherwise', () => {
    const testCases = [
      dayFactory(habitFactory(), undefined, true),
      dayFactory(habitFactory(), 1, true),
      dayFactory(habitFactory(), 10, true),
      dayFactory(habitFactory(), 5, true),
    ];

    for (const daysTestCase of testCases) {
      let prevDate: DateTime;
      for (const id in daysTestCase) {
        const currentDate = DateTime.fromISO(daysTestCase[id].date);
        if (prevDate) {
          // Ensure dates are only off by 1
          const daysDiff = currentDate.diff(prevDate, ['days']).toObject().days;
          expect(daysDiff).toBe(1);
        }
        prevDate = currentDate;
      }
    }
    // TODO: how to test if it is random otherwise?
  });

  test('should generate past days (up to the present)', () => {
    const testCases = [
      dayFactory(habitFactory(), undefined),
      dayFactory(habitFactory(), 1),
      dayFactory(habitFactory(), 10),
      dayFactory(habitFactory(), 5),
    ];

    for (const daysTestCase of testCases) {
      for (const id in daysTestCase) {
        const date = DateTime.fromISO(daysTestCase[id].date);
        expect(date.startOf('day') <= DateTime.now()).toBe(true);
      }
    }
  });

  // TODO:
  // test('should have all the right day properties for each day', () => {

  // });

  // test('should override day properties correctly for each property', () => {

  // });
});

describe('Calendar Factory', () => {
  const testCases = [
    dayFactory(habitFactory()),
    dayFactory(habitFactory(10), 1),
    dayFactory(habitFactory(), 20),
    dayFactory(habitFactory(), 0),
    dayFactory(habitFactory(), -1),
  ];
  test('should return the same calendar days that are provided in the days object', () => {
    for (const days of testCases) {
      const daysFromCalendar = Object.keys(calendarFactory(days)).sort();
      const daysFromTest = Object.keys(days).sort();
      expect(daysFromCalendar.every((date) => daysFromTest.includes(date)));
    }
  });
  test('should show color corresponding to most common mood for a day', () => {
    for (const days of testCases) {
      const dates = Object.keys(days);
      for (const date of dates) {
        const testMostCommonMoodColor =
          MoodToColor[getMoodMode(days[date].mood)];
        const calendarDayColor = calendarFactory(days)[date].color;
        expect(testMostCommonMoodColor).toBe(calendarDayColor);
      }
    }
  });
  test('should override selected fields', () => {
    const days = dayFactory(habitFactory());
    const overrideTestCases: CalendarDataType[] = [
      { selected: true, startingDay: true, endingDay: true },
      { color: Colors.happyGreen },
      { color: Colors.neutralYellow },
      { color: Colors.sadRed },
    ];
    for (const override of overrideTestCases) {
      const calendar = calendarFactory(days, override);
      for (const date in days) {
        for (const calendarProp in override) {
          expect(calendar[date][calendarProp]).toEqual(override[calendarProp]);
        }
      }
    }
  });
});

describe('Mood Factory', () => {
  test('should have only valid moods', () => {
    const validMoods: ValidMoods[] = ['Great', 'Okay', 'Not Good'];
    const testCases = [
      moodFactory(),
      moodFactory(0),
      moodFactory(1),
      moodFactory(10),
      moodFactory(21),
      moodFactory(-1),
    ];
    for (const moods of testCases) {
      for (const mood of moods) {
        expect(validMoods.includes(mood)).toBe(true);
      }
    }
  });
  test('should have number of moods matching the specified mood count', () => {
    const testCases: TableTest<number, number> = [
      [1, 1],
      [3, 3],
      [0, 0],
      [-1, 0],
    ];
    for (const moodCounts of testCases) {
      expect(moodFactory(moodCounts[0]).length).toBe(moodCounts[1]);
    }
  });
});

describe('Journal Factories', () => {
  test('should have correct default CBT fields', () => {
    const testCases = [
      cbtFactory(),
      cbtFactory(1),
      cbtFactory(20),
      cbtFactory(0),
      cbtFactory(-1),
    ];
    const defaultFields = [
      'date',
      'situationText',
      'thoughtsText',
      'emotionsText',
      'behaviorsText',
      'alternativeThoughtsText',
    ];

    for (const cbtJournals of testCases) {
      for (const journal in cbtJournals) {
        for (const cbtProp of defaultFields) {
          expect(defaultFields.includes(cbtProp)).toBe(true);
        }
      }
    }
  });

  test('should overwrite correct CBT fields', () => {
    const overrideTestCases: OptionalCbtJournalEntryType[] = [
      { situationText: 'This is sample text' },
      { date: '2021-01-01' },
      { alternativeThoughtsText: 'sample alt thoughts' },
      { behaviorsText: 'sample behaviors text' },
    ];
    for (const override of overrideTestCases) {
      const cbtJournals = cbtFactory(undefined, override);
      for (const id in cbtJournals) {
        for (const journalProp in override) {
          expect(cbtJournals[id][journalProp]).toEqual(override[journalProp]);
        }
      }
    }
  });

  test('should have correct number of CBT journals', () => {
    expect(Object.keys(cbtFactory()).length).toBeGreaterThan(0);
    expect(Object.keys(cbtFactory()).length).toBeLessThan(11);
    expect(Object.keys(cbtFactory(1)).length).toBe(1);
    expect(Object.keys(cbtFactory(0)).length).toBe(0);
    expect(Object.keys(cbtFactory(-1)).length).toBe(0);
    expect(Object.keys(cbtFactory(20)).length).toBe(20);
  });
});
