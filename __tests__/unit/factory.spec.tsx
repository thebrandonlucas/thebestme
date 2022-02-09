import { DateTime } from 'luxon';
import { daysFixture, getNextDay } from '../../__fixtures__/factory/day';

describe('Day Fixtures', () => {
  describe('dayFixture', () => {
    it.todo('should return a day with the following properties');
  });

  describe('daysFixture', () => {
    it('should have 0 days', () => {
      const days = daysFixture([]);
      expect(Object.keys(days).length).toBe(0);
    });

    it('should have 1 day', () => {
      const days = daysFixture([{}]);
      expect(Object.keys(days).length).toBe(1);
    });

    it('should have 5 days', () => {
      const days = daysFixture([{}, {}, {}, {}, {}]);
      expect(Object.keys(days).length).toBe(5);
    });

    it('should have 100 days', () => {
      let overrides = [];
      for (let i = 0; i < 100; i++) {
        overrides.push({});
      }
      const days = daysFixture(overrides);
      expect(Object.keys(days).length).toBe(100);
    });

    it('should return correct overrides', () => {
      const day = daysFixture([
        {
          date: '2021-01-01',
          finishedHabitIds: ['1234', '5678'],
          mood: ['Not Good', 'Great'],
        },
      ]);
      const date = Object.keys(day)[0];
      expect(day[date].date).toBe('2021-01-01');
      expect(day[date].finishedHabitIds).toEqual(['1234', '5678']);
      expect(day[date].mood).toEqual(['Not Good', 'Great']);
    });

    it('should have 3 days with given overrides', () => {
      const days = daysFixture([
        { date: '2021-01-01', finishedHabitIds: [] },
        { date: '2021-01-02', finishedHabitIds: ['1234', '5678'] },
        { date: '2021-01-12', finishedHabitIds: ['1234'] },
      ]);
      expect(days['2021-01-01'].finishedHabitIds).toEqual([]);
      expect(days['2021-01-02'].finishedHabitIds).toEqual(['1234', '5678']);
      expect(days['2021-01-12'].finishedHabitIds).toEqual(['1234']);
      expect(Object.keys(days).length).toBe(3);
    });

    it('should return first day with date of 3 days ago', () => {
      expect(Object.keys(daysFixture([{}, {}, {}]))[0]).toBe(
        DateTime.now().minus({ days: 3 }).toISODate()
      );
    });

    it('should return overridden day instead of 2 days ago for first day', () => {
      const days = daysFixture([{ date: '2021-01-01' }, {}, {}]);
      expect(Object.keys(days)).toEqual([
        '2021-01-01',
        '2021-01-02',
        '2021-01-03',
      ]);
    });
  });

  describe('getNextDay', () => {
    it('returns the date of the override', () => {
      expect(getNextDay({ date: '2021-01-01' }).date).toBe('2021-01-01');
    });

    it('gets the next date after the one provided', () => {
      expect(getNextDay({}, '2021-01-01').date).toBe('2021-01-02');
    });

    it('generates a starting date if theres not a previous date and no override', () => {
      // In our case, we set the default date to be '2021-01-01' in the dayFixture generator
      expect(getNextDay({}).date).toBe('2021-01-01');
    });
  });
});
