import { DateTime } from 'luxon';
import { getMoodMode } from '../../utils/mood';
import { getNextDate } from '../../__fixtures__/factory/day';
import { habitsFixture } from '../../__fixtures__/factory/habit';
import {
  generateTestDaysWithHabitsRandom,
  getHabitDayPropertiesRandom,
} from '../../__fixtures__/testutil';

describe('Test Utilities', () => {
  describe('injectTestDays', () => {
    it('should inject 1 test day', () => {
      expect(Object.keys(generateTestDaysWithHabitsRandom(1)).length).toBe(1);
    });
    it('should inject 100 test days', () => {
      expect(Object.keys(generateTestDaysWithHabitsRandom(100)).length).toBe(
        100
      );
    });
    it('should inject only sequential test days', () => {
      let days = generateTestDaysWithHabitsRandom(20);
      const dates = Object.keys(days);
      for (let i = 0; i < 19; i++) {
        const nextDateActual = dates[i + 1];
        const nextDateExpected = getNextDate(dates[i]);
        expect(nextDateExpected).toBe(nextDateActual);
      }
    });
    it('should have first day be 3 days ago', () => {
      let days = generateTestDaysWithHabitsRandom(3);
      const date = Object.keys(days)[0];
      expect(date).toBe(DateTime.now().minus({ days: 3 }).toISODate());
    });
    it('should generate 1 day with 1 habit either remaining or completed', () => {
      const habit = habitsFixture([{}]);
      const habitId = habit[Object.keys(habit)[0]].id;
      const days = generateTestDaysWithHabitsRandom(1, habit);
      const date = Object.keys(days)[0];

      expect(
        days[date].remainingHabitIds.includes(habitId) ||
          days[date].finishedHabitIds.includes(habitId)
      ).toBe(true);
    });
    it('should have 10 habits on the 40th test day out of 100 days', () => {
      const habits = habitsFixture([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]);
      const days = generateTestDaysWithHabitsRandom(100, habits);
      const fourtiethDate = Object.keys(days)[39];
      expect(days[fourtiethDate].habitCount);
    });
    it('should generate 1 day with 1 habit with happy mood', () => {
      const habit = habitsFixture([{}]);
      const days = generateTestDaysWithHabitsRandom(1, habit, ['Great']);
      const date = Object.keys(days)[0];

      expect(getMoodMode(days[date].mood)).toBe('Great');
    });
    it('should generate 100 days with 10 habits with happy or sad mood on the 32nd day', () => {
      const habits = habitsFixture([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]);
      const days = generateTestDaysWithHabitsRandom(100, habits, [
        'Great',
        'Not Good',
      ]);
      const date = Object.keys(days)[31];

      expect(
        getMoodMode(days[date].mood) === 'Great' ||
          getMoodMode(days[date].mood) === 'Not Good'
      ).toBe(true);
    });
  });
  describe('getHabitDayPropertiesRandom', () => {
    it('should randomly place a habit in finishedHabitIds or remainingHabitIds', () => {
      const habit = habitsFixture([{}]);
      const habitId = Object.keys(habit)[0];
      const result = getHabitDayPropertiesRandom(habit);
      expect(
        result.finishedHabitIds.includes(habitId) ||
          result.remainingHabitIds.includes(habitId)
      ).toBe(true);
    });
    it('should have habitCount equal length of finishedHabitIds and remainingHabitIds for 10 habits', () => {
      const habits = habitsFixture([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]);
      const days = generateTestDaysWithHabitsRandom(1, habits);
      const date = Object.keys(days)[0];
      expect(
        days[date].finishedHabitIds.length + days[date].remainingHabitIds.length
      ).toEqual(days[date].habitCount);
    });
  });
});

// Be able to pass it a set of habits for each day, a set of moods for each day, a set of journals for each day,
// and it generates the number of days based on the length of the sets passed to it.
// Each set should be of equal length

// Ex.

// injectHabit(habits, moods, journals)

// injectHabit(
//  [{id: 'xxx', checked: true, text: 'blah blah'}, {id: 'xxx', checked: false, text: 'blah blah 2'}],
//  moods: [['Great', 'Okay'], ['Not Good'], ['Okay']]
// )
