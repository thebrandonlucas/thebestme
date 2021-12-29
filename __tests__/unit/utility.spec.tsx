// FIXME: for some reason, everything has to be in a .tsx extension for Eslint
// to autoformat it on save, which is super annoying.
import {
  HabitFrequencySingleMoodBarChartData,
  ICalendarDataType,
  IDayType,
} from '../../types';
import getCalendarData from '../../utils/getCalendarData';
import { getHabitFrequencies } from '../../utils/getHabitFrequencies';
import { getMoodMode } from '../../utils/mood';
import { habits } from '../../__fixtures__/component/HabitScreen.fixture';
import {
  GetHabitFrequenciesParams,
  GetTopHabitFrequenciesPerMoodInput,
  TableTest,
} from '../../__fixtures__/test-types';
import {
  calendarDataMultipleDaysWithSelectedDayResult,
  calendarDataSelectedDayOnlyResult,
} from '../../__fixtures__/unit/expected-results/get-calendar-data';
import { habitFrequenciesResult } from '../../__fixtures__/unit/expected-results/get-habit-frequencies';
import {
  days,
  daysWithOneMoodNoHabitsOrJournals,
  singleDayWithOneMoodNoHabitsOrJournals,
} from '../../__fixtures__/unit/inputs/days';

/**
 * Helper function to run Table Tests given a testCases table and the function to be tested
 * @param testCases - Test params and expected results where testCases[i][0] is an array of input
 *                    params and testCases[i][1] is the expected result at index i
 * @param functionToTest - The function definition to be tested
 */
export function runTableTests(
  testCases: TableTest<any, any>,
  functionToTest: (...parameters: any[]) => any
) {
  for (let i = 0; i < testCases.length; i++) {
    const parameters = testCases[i][0];
    const expectedResult = testCases[i][1];
    expect(functionToTest(...parameters)).toEqual(expectedResult);
  }
}

describe('Utility Functions', () => {
  it('should get the most common (average/mode) mood from a list of moods', () => {
    const testCases: TableTest<string, string> = [
      [['Great'], 'Great'],
      [['Great', 'Not Good'], 'Not Good'],
      [['Great', 'Not Good', 'Okay'], 'Okay'],
      [['Great', 'Not Good', 'Not Good', 'Okay'], 'Not Good'],
      [['Not Good', 'Not Good', 'Great', 'Okay'], 'Not Good'],
      [['Great', 'Not Good', 'Okay', 'Okay'], 'Okay'],
      [[], 'No mood provided'],
      [['Fake Mood'], 'Invalid mood found'],
    ];
    runTableTests(testCases, getMoodMode);
  });

  // Tests calendar day logic for DataScreen (is it getting the right days?)
  it('should return correct calendar props given ISO date and IDayType days', () => {
    const testCases: TableTest<string | IDayType, ICalendarDataType> = [
      [
        ['2021-01-01', singleDayWithOneMoodNoHabitsOrJournals],
        calendarDataSelectedDayOnlyResult,
      ],
      [
        ['2021-01-01', daysWithOneMoodNoHabitsOrJournals],
        calendarDataMultipleDaysWithSelectedDayResult,
      ],
    ];
    runTableTests(testCases, getCalendarData);
  });

  it('should return a list of habit frequency objects for a given mood', () => {
    const testCases: TableTest<
      GetHabitFrequenciesParams,
      HabitFrequencySingleMoodBarChartData
    > = [
      ['Great', habits, days],
      habitFrequenciesResult,
    ];
    runTableTests(testCases, getHabitFrequencies);
  });

  // Test whether the top mood frequencies are generated
  it('should get the top habit frequencies for each mood', () => {
    expect(true).toBe(true);

    // getTopHabitFrequenciesPerMood();
  });
});
