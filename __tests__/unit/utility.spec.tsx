// FIXME: for some reason, everything has to be in a .tsx extension for Eslint
// to autoformat it on save, which is super annoying.
import { getMoodMode } from '../../utils/mood';
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

  // TODO: create a day Fixture and then a days fixture on top of it, without using faker
  // so that you can predictably test things
  // e.g.
  // function clientFixture(props: Partial<RawClient> = {}): RawClient {
  //   const defaults: RawClient = {
  //     id: uuidv4(),
  //     full_name: "John Doe",
  //     email: "john.doe@example.com",
  //     email_notifications: true,
  //   };

  //   return { ...defaults, ...props };
  // }
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
//     const testCases: TableTest<getHabitFrequencies, MoodFrequency> = [
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
//     runTableTests(testCases, getHabitFrequencies);
//   });

//   it('should return true', () => {
//     expect(true).toBe(true);
//   });
// });

// describe('Get Mood Frequencies for Habit', () => {
//   // Generate test habit set
//   const testHabitSet = [
//     habitsFactory(),
//     habitsFactory(1),
//     habitsFactory(10),
//     habitsFactory(23),
//     habitsFactory(0),
//     habitsFactory(-1),
//   ];
//   // Generate test day set
//   const testDaySet = testHabitSet.map((habits) => daysFactory(habits));
//   // const testDaySetDaysSequential = testHabitSet.map(habits => daysFactory(habits, undefined, true));
//   // Grab random habitId from corresponding habitId set
//   const testHabitIdSet = testHabitSet.map((habits) =>
//     faker.random.arrayElement(Object.keys(habits))
//   );

//   test('should get correct number of mood frequencies for finished habits', () => {
//     for (let i = 0; i < testHabitSet.length; i++) {
//       const habits = testHabitSet[i];
//       const habitId = testHabitIdSet[i];
//       const days = testDaySet[i];
//       // count the times that habit has been finished across days
//       let finishedHabitCount = 0;
//       for (const day in days) {
//         finishedHabitCount += days[day].finishedHabitIds.filter(
//           (id) => id === habitId
//         ).length;
//       }
//       const finishedHabitFrequencyResult: HabitFrequency = {
//         habit: habitId,
//         frequency: finishedHabitCount,
//       };
//       expect(getHabitFrequencies(habitId, habits, days, true)).toEqual(
//         finishedHabitFrequencyResult
//       );
//     }
//   });

//   test('should get correct number of mood frequencies for remaining habits', () => {
//     for (let i = 0; i < testHabitSet.length; i++) {
//       const habits = testHabitSet[i];
//       const habitId = testHabitIdSet[i];
//       const days = testDaySet[i];
//       // count the times that habit has been finished across days
//       let remainingHabitCount= 0;
//       for (const day in days) {
//         remainingHabitCount += days[day].remainingHabitIds.filter(
//           (id) => id === habitId
//         ).length;
//       }
//       const remainingHabitFrequencyResult: HabitFrequency = {
//         habit: habitId,
//         frequency: remainingHabitCount,
//       };
//       expect(getHabitFrequencies(habitId, habits, days, true)).toEqual(
//         remainingHabitFrequencyResult
//       );
//     }
//   });

// test('should get the correct number of finished habit frequencies for the given mood (based on the most common mood for that time period)', () => {
//   const moods: ValidMood[] = ['Great', 'Okay', 'Not Good'];
//   // loop and count the occurrences when the habits match the mood (don't forget to account for finished, remaining, and unspecified cases)
//   for (const mood of moods) {
//     for (let i = 0; i < testHabitSet.length; i++) {
//       const habits = testHabitSet[i];
//       const habitId = testHabitIdSet[i];
//       const days = testDaySet[i];
//       // count the times that habit has been finished across days
//       let finishedHabitCount = 0;
//       for (const day in days) {
//         const mostCommonMood = getMoodMode(days[day].mood);
//         finishedHabitCount += days[day].finishedHabitIds.filter(
//           (id) => id === habitId
//         ).length;
//       }
//       const finishedHabitFrequencyResult: HabitFrequency = {
//         habit: habitId,
//         frequency: finishedHabitCount,
//       };
//       expect(getHabitFrequencies(habitId, habits, days, true)).toEqual(
//         finishedHabitFrequencyResult
//       );
//     }
//   }
// });

// test('should get correct number of mood frequencies from start date', () => {});

// test('should get correct number of mood frequencies up to end date', () => {});

// // Mood arrays need to change to arrays of objects to include timestamp, mood, habitId
// // and activity that's associated with that mood
// test('should get the correct number of mood frequencies for a given time period', () => {

// });

// test('should get the correct count of moods associated with an activity')

// test('should get correct number of mood frequencies for date range', () => {});
// });

// describe('Get Calendar Data', () => {
//   it('should return correct calendar props given ISO date and IDayType days', () => {
//     const calendarProps = ['color', 'startingDay', 'endingDay', 'selected'];
//     const testCases = [
//       daysFactory(habitsFactory()),
//       daysFactory(habitsFactory(1)),
//       daysFactory(habitsFactory(3)),
//       daysFactory(habitsFactory(10)),
//     ];
//     for (const days of testCases) {
//       for (const day in days) {
//         expect(Object.keys(getCalendarData(days)[day]).sort()).toEqual(
//           calendarProps.sort()
//         );
//       }
//     }
//   });

//   it('should return correct color for each date', () => {
//     // TODO: how to test for selectedDate color?
//     const testCases: TableTest<IDayType, string> = [
//       [
//         daysFactory(habitsFactory(), undefined, undefined, { mood: ['Great'] }),
//         MoodToColor['Great'],
//       ],
//       [
//         daysFactory(habitsFactory(), undefined, undefined, { mood: ['Okay'] }),
//         MoodToColor['Okay'],
//       ],
//       [
//         daysFactory(habitsFactory(), undefined, undefined, { mood: [] }),
//         'transparent',
//       ],
//       [
//         daysFactory(habitsFactory(), undefined, undefined, {
//           mood: ['Great', 'Not Good', 'Great'],
//         }),
//         MoodToColor['Great'],
//       ],
//       [
//         daysFactory(habitsFactory(), undefined, undefined, {
//           mood: ['Great', 'Not Good', 'Not Good'],
//         }),
//         MoodToColor['Not Good'],
//       ],
//       [
//         daysFactory(habitsFactory(), undefined, undefined, {
//           mood: ['Okay', 'Okay', 'Not Good'],
//         }),
//         MoodToColor['Okay'],
//       ],
//     ];

//     for (let i = 0; i < testCases.length; i++) {
//       const days: IDayType = testCases[i][0];
//       const mostCommonMoodColor = testCases[i][1];
//       const calendarData = getCalendarData(days);
//       for (const id in days) {
//         expect(calendarData[id].color).toEqual(mostCommonMoodColor);
//       }
//     }
//   });

//   it('should return the correct number of calendar days', () => {
//     expect(
//       Object.keys(getCalendarData(daysFactory(habitsFactory(), 0))).length
//     ).toBe(0);
//     expect(
//       Object.keys(getCalendarData(daysFactory(habitsFactory(), 1))).length
//     ).toBe(1);
//     expect(
//       Object.keys(getCalendarData(daysFactory(habitsFactory(), 10))).length
//     ).toBe(10);
//     expect(
//       Object.keys(getCalendarData(daysFactory(habitsFactory(), 32))).length
//     ).toBe(32);
//     expect(
//       Object.keys(getCalendarData(daysFactory(habitsFactory(), -1))).length
//     ).toBe(0);
//     expect(
//       Object.keys(getCalendarData(daysFactory(habitsFactory()))).length
//     ).toBeGreaterThan(0);
//     expect(
//       Object.keys(getCalendarData(daysFactory(habitsFactory()))).length
//     ).toBeLessThanOrEqual(10);
//   });

//   it('should return matching dates given the days', () => {
//     const testCases = [
//       daysFactory(habitsFactory()),
//       daysFactory(habitsFactory(), 10),
//       daysFactory(habitsFactory(), 21),
//       daysFactory(habitsFactory(), 0),
//       daysFactory(habitsFactory(), 1, undefined, { date: '2021-01-01' }),
//     ];

//     for (const days of testCases) {
//       expect(Object.keys(getCalendarData(days)).sort()).toEqual(
//         Object.keys(days).sort()
//       );
//     }
//   });
// });
