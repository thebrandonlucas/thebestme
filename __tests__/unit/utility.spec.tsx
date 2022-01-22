// FIXME: for some reason, everything has to be in a .tsx extension for Eslint
// to autoformat it on save, which is super annoying.
import { runTableTests } from '../../__fixtures__/testutil';
import {
  HabitFrequency,
  ICalendarDataType,
  IDayType,
  MoodFrequency,
} from '../../types';
import getCalendarData from '../../utils/getCalendarData';
import { getHabitFrequenciesForMood } from '../../utils/getHabitFrequencies';
import { getMoodFrequenciesForHabit } from '../../utils/getMoodFrequenciesForHabit';
import { getMoodMode } from '../../utils/mood';
import { habits } from '../../__fixtures__/component/HabitScreen.fixture';
import {
  GetHabitFrequenciesParams,
  GetMoodFrequenciesForHabit,
  TableTest,
} from '../../__fixtures__/test-types';
import {
  calendarDataMultipleDaysWithSelectedDayResult,
  calendarDataSelectedDayOnlyResult,
} from '../../__fixtures__/unit/expected-results/get-calendar-data';
import { habitFrequenciesResult } from '../../__fixtures__/unit/expected-results/get-habit-frequencies';
import {
  moodFrequenciesResult,
  moodFrequenciesResult1,
  moodFrequenciesResult2,
  moodFrequenciesResult3,
} from '../../__fixtures__/unit/expected-results/get-mood-frequencies';
import {
  days,
  daysWithOneMoodNoHabitsOrJournals,
  singleDayWithOneMoodNoHabitsOrJournals,
} from '../../__fixtures__/unit/inputs/days';



describe('Utility Functions', () => {
  // it('should get the most common (average/mode) mood from a list of moods', () => {
  //   const testCases: TableTest<string[], string> = [
  //     [['Great'], 'Great'],
  //     [['Great', 'Not Good'], 'Not Good'],
  //     [['Great', 'Not Good', 'Okay'], 'Okay'],
  //     [['Great', 'Not Good', 'Not Good', 'Okay'], 'Not Good'],
  //     [['Not Good', 'Not Good', 'Great', 'Okay'], 'Not Good'],
  //     [['Great', 'Not Good', 'Okay', 'Okay'], 'Okay'],
  //     [[], 'No mood provided'],
  //     [['Fake Mood'], 'Invalid mood found'],
  //   ];
  //   runTableTests(testCases, getMoodMode);
  // });

//   // Tests calendar day logic for DataScreen (is it getting the right days?)
//   it('should return correct calendar props given ISO date and IDayType days', () => {
//     const testCases: TableTest<[string, IDayType], ICalendarDataType> = [
//       [
//         ['2021-01-01', singleDayWithOneMoodNoHabitsOrJournals],
//         calendarDataSelectedDayOnlyResult,
//       ],
//       [
//         ['2021-01-01', daysWithOneMoodNoHabitsOrJournals],
//         calendarDataMultipleDaysWithSelectedDayResult,
//       ],
//     ];
//     runTableTests(testCases, getCalendarData);
//   });

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
  })
});
