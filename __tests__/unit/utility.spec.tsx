// FIXME: for some reason, everything has to be in a .tsx extension for Eslint
// to autoformat it on save, which is super annoying.
import { MoodToColor } from '../../constants/MoodToColor';
import { IDayType } from '../../types';
import getCalendarData from '../../utils/getCalendarData';
import { getMoodMode } from '../../utils/mood';
import { dayFactory } from '../../__fixtures__/factory/day';
import { habitFactory } from '../../__fixtures__/factory/habit';
import { TableTest } from '../../__fixtures__/test-types';
import { runTableTests } from '../../__fixtures__/testutil';

describe('Utility Functions', () => {
  it('should get the most common (average/mode) mood from a list of moods', () => {
    const testCases: TableTest<string[][], string> = [
      [[['Great']], 'Great'],
      [[['Great', 'Not Good']], 'Not Good'],
      [[['Great', 'Not Good', 'Okay']], 'Okay'],
      [[['Great', 'Not Good', 'Not Good', 'Okay']], 'Not Good'],
      [[['Not Good', 'Not Good', 'Great', 'Okay']], 'Not Good'],
      [[['Great', 'Not Good', 'Okay', 'Okay']], 'Okay'],
      [[[]], 'No mood provided'],
      [[['Fake Mood']], 'Invalid mood found'],
    ];
    runTableTests(testCases, getMoodMode);
  });

  //   it('should return a list of habit frequencies for a given mood', () => {
  //     const testCases: TableTest<GetHabitFrequenciesParams, HabitFrequency> = [
  //       [['Great', habits, days], habitFrequenciesResult],
  //       [['Great', habits, days], habitFrequenciesResult],
  //       [['Great', habits, days], habitFrequenciesResult],
  //     ];
  //     runTableTests(testCases, getHabitFrequenciesForMood);
  //   });

  //   // Test whether the top mood frequencies are generated
  //   it('should get a list of mood frequencies per habit', () => {
  //     const testCases: TableTest<GetMoodFrequenciesForHabit, MoodFrequency> = [
  //       [
  //         [
  //           '2ea7e123-596a-4abb-b68e-899edbf3bd0b',
  //           habits,
  //           days,
  //           false,
  //           '2021-12-24',
  //           '2021-01-31',
  //         ],
  //         moodFrequenciesResult,
  //       ],
  //       [
  //         [
  //           'e0e1d3b0-dd0f-4c45-9c52-9f62efda5f62',
  //           habits,
  //           days,
  //           true,
  //           '2021-12-24',
  //           '2021-12-27',
  //         ],
  //         moodFrequenciesResult1,
  //       ],
  //       [
  //         [
  //           'adda8857-9b7b-4ffc-9776-38c61bb52618',
  //           habits,
  //           days,
  //           true,
  //           '2021-12-24',
  //           '2022-01-01',
  //         ],
  //         moodFrequenciesResult2,
  //       ],
  //       [
  //         [
  //           '2ea7e123-596a-4abb-b68e-899edbf3bd0b',
  //           habits,
  //           days,
  //           true,
  //           '2021-12-23',
  //           '2021-12-27',
  //         ],
  //         moodFrequenciesResult3,
  //       ],
  //     ];
  //     // TODO: Will need to refactor habitIds field into finishedHabitIds and remainingHabitIds
  //     // to be able to tell which one's were completed/incomplete on a given day
  //     runTableTests(testCases, getMoodFrequenciesForHabit);
  //   });

  it('should return true', () => {
    expect(true).toBe(true);
  });
});

describe('Get Calendar Data', () => {
  it('should return correct calendar props given ISO date and IDayType days', () => {
    const calendarProps = ['color', 'startingDay', 'endingDay', 'selected'];
    const testCases = [
      dayFactory(habitFactory()),
      dayFactory(habitFactory(1)),
      dayFactory(habitFactory(3)),
      dayFactory(habitFactory(10)),
    ];
    for (const days of testCases) {
      for (const day in days) {
        expect(Object.keys(getCalendarData(days)[day]).sort()).toEqual(
          calendarProps.sort()
        );
      }
    }
  });

  it('should return correct color for each date', () => {
    // TODO: how to test for selectedDate color?
    const testCases: TableTest<IDayType, string> = [
      [
        dayFactory(habitFactory(), undefined, undefined, { mood: ['Great'] }),
        MoodToColor['Great'],
      ],
      [
        dayFactory(habitFactory(), undefined, undefined, { mood: ['Okay'] }),
        MoodToColor['Okay'],
      ],
      [
        dayFactory(habitFactory(), undefined, undefined, { mood: [] }),
        'transparent',
      ],
      [
        dayFactory(habitFactory(), undefined, undefined, {
          mood: ['Great', 'Not Good', 'Great'],
        }),
        MoodToColor['Great'],
      ],
      [
        dayFactory(habitFactory(), undefined, undefined, {
          mood: ['Great', 'Not Good', 'Not Good'],
        }),
        MoodToColor['Not Good'],
      ],
      [
        dayFactory(habitFactory(), undefined, undefined, {
          mood: ['Okay', 'Okay', 'Not Good'],
        }),
        MoodToColor['Okay'],
      ],
    ];

    for (let i = 0; i < testCases.length; i++) {
      const days: IDayType = testCases[i][0];
      const mostCommonMoodColor = testCases[i][1];
      const calendarData = getCalendarData(days);
      for (const id in days) {
        expect(calendarData[id].color).toEqual(mostCommonMoodColor);
      }
    }
  });

  it('should return the correct number of calendar days', () => {
    expect(Object.keys(getCalendarData(dayFactory(habitFactory(), 0))).length).toBe(0);
    expect(Object.keys(getCalendarData(dayFactory(habitFactory(), 1))).length).toBe(1);
    expect(Object.keys(getCalendarData(dayFactory(habitFactory(), 10))).length).toBe(10);
    expect(Object.keys(getCalendarData(dayFactory(habitFactory(), 32))).length).toBe(32);
    expect(Object.keys(getCalendarData(dayFactory(habitFactory(), -1))).length).toBe(0);
    expect(Object.keys(getCalendarData(dayFactory(habitFactory()))).length).toBeGreaterThan(0);
    expect(Object.keys(getCalendarData(dayFactory(habitFactory()))).length).toBeLessThanOrEqual(10);
  });

  it('should return matching dates given the days', () => {
    const testCases = [
      dayFactory(habitFactory()),
      dayFactory(habitFactory(), 10),
      dayFactory(habitFactory(), 21),
      dayFactory(habitFactory(), 0),
      dayFactory(habitFactory(), 1, undefined, { date: '2021-01-01'})
    ];

    for (const days of testCases) {
      expect(Object.keys(getCalendarData(days)).sort()).toEqual(Object.keys(days).sort())
    }
  });
});
