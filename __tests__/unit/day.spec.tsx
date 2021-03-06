import { DateTime } from 'luxon';
import {
  getDaysInTimeRange,
  getDaysPastWeek,
  getMostRecentDay,
  isDatetimeInRange,
} from '../../utils/day';
import { getDaysWithSelectedMood } from '../../utils/mood';
import {
  dayFixture,
  daysFixture,
  getNextDate,
  getPastDate,
} from '../../__fixtures__/factory/day';

describe('Day functions', () => {
  describe('getDaysInTimeRange', () => {
    let days;
    const startDate = '2020-12-10';
    const endDate = '2020-12-14';
    beforeAll(() => {
      days = daysFixture([
        { date: '2020-12-11' },
        { date: '2020-12-12' },
        { date: '2020-12-13' },
        { date: '2020-12-16' },
      ]);
    });
    it('should only get days within the specified time range', () => {
      // The number of objects in the array will equal the number of days
      // FIXME: add in ID override for consistency between expected and received

      expect(getDaysInTimeRange(days, startDate, endDate)).toEqual(
        daysFixture([
          { date: '2020-12-11' },
          { date: '2020-12-12' },
          { date: '2020-12-13' },
        ])
      );
    });

    it('should get the correct number of days', () => {
      expect(
        Object.keys(getDaysInTimeRange(days, startDate, endDate)).length
      ).toEqual(3);
    });
  });

  describe('isDatetimeInRange', () => {
    it('should be in between start and end date', () => {
      expect(isDatetimeInRange('2021-01-01', '2021-03-01', '2021-01-02')).toBe(
        true
      );
      expect(isDatetimeInRange('2021-12-23', '2023-03-03', '2022-01-01')).toBe(
        true
      );
    });
    it('should return false if it is earlier than start date', () => {
      expect(isDatetimeInRange('2021-01-01', '2020-12-31', '2021-01-02')).toBe(
        false
      );
      expect(isDatetimeInRange('2021-12-23', '2021-01-01', '2023-03-03')).toBe(
        false
      );
    });
    it('should return false if it is later than end date', () => {
      expect(isDatetimeInRange('2021-01-01', '2021-01-02', '2021-03-01')).toBe(
        false
      );
      expect(isDatetimeInRange('2021-12-23', '2022-01-01', '2022-01-03')).toBe(
        false
      );
    });
  });

  describe('getDaysWithPrimaryMood', () => {
    it('should get days that have the selected mood as the primary mood', () => {
      const days = daysFixture([
        { date: '2021-01-01', mood: ['Great', 'Okay', 'Okay', 'Not Good'] },
        { date: '2021-01-02', mood: ['Great', 'Not Good', 'Great'] },
        { date: '2021-01-03', mood: ['Not Good', 'Not Good', 'Great'] },
        { date: '2021-01-04', mood: ['Great'] },
        { date: '2021-01-05', mood: [] },
      ]);
      expect(getDaysWithSelectedMood('Great', days)).toEqual(
        daysFixture([
          { date: '2021-01-02', mood: ['Great', 'Not Good', 'Great'] },
          { date: '2021-01-04', mood: ['Great'] },
        ])
      );
    });
  });

  describe('getNextDate', () => {
    it('should get 2021-01-02 when given 2021-01-01', () => {
      expect(getNextDate('2021-01-01')).toBe('2021-01-02');
    });
  });

  describe('getPastDate', () => {
    it('should get ISO date 1 day ago', () => {
      expect(getPastDate(1)).toBe(
        DateTime.now().minus({ days: 1 }).toISODate()
      );
    });
    it('should get 3 days ago', () => {
      expect(getPastDate(3)).toBe(
        DateTime.now().minus({ days: 3 }).toISODate()
      );
    });
  });

  describe('getMostRecentDay', () => {
    const day = daysFixture([{ date: '2021-01-01' }]);
    it('should get the last day when theres only one day to pick from', () => {
      expect(getMostRecentDay(day)).toEqual(dayFixture({ date: '2021-01-01' }));
    });

    it('should get the last day when there are 10 days', () => {
      const days = daysFixture([
        { date: '2021-01-01' },
        { date: '2021-01-02' },
        { date: '2021-01-03' },
        { date: '2021-01-04' },
        { date: '2021-01-05' },
        { date: '2021-01-06' },
        { date: '2021-01-07' },
        { date: '2021-01-08' },
        { date: '2021-01-09' },
        { date: '2021-01-10' },
      ]);
      expect(getMostRecentDay(days)).toEqual(
        dayFixture({ date: '2021-01-10' })
      );
    });
    it('should get an empty day when ')
  });

  describe('getDaysPastWeek', () => {
    const past10Days = daysFixture([
      { date: DateTime.now().minus({ days: 10 }).toISODate() },
      { date: DateTime.now().minus({ days: 9 }).toISODate() },
      { date: DateTime.now().minus({ days: 8 }).toISODate() },
      { date: DateTime.now().minus({ days: 7 }).toISODate() },
      { date: DateTime.now().minus({ days: 6 }).toISODate() },
      { date: DateTime.now().minus({ days: 5 }).toISODate() },
      { date: DateTime.now().minus({ days: 4 }).toISODate() },
      { date: DateTime.now().minus({ days: 3 }).toISODate() },
      { date: DateTime.now().minus({ days: 2 }).toISODate() },
      { date: DateTime.now().minus({ days: 1 }).toISODate() },
    ]);
    const past3Days = daysFixture([
      { date: DateTime.now().minus({ days: 3 }).toISODate() },
      { date: DateTime.now().minus({ days: 2 }).toISODate() },
      { date: DateTime.now().minus({ days: 1 }).toISODate() },
    ]);
    // const pastDay = daysFixture([{ date: '2021-01-01' }]);
    it('should get past three days when only 3 days are given', () => {
      expect(getDaysPastWeek(past3Days)).toEqual(
        daysFixture([
          { date: DateTime.now().minus({ days: 3 }).toISODate() },
          { date: DateTime.now().minus({ days: 2 }).toISODate() },
          { date: DateTime.now().minus({ days: 1 }).toISODate() },
        ])
      );
    });
    it('should return past 7 days when 10 days are given', () => {
      expect(getDaysPastWeek(past10Days)).toEqual(
        daysFixture([
          { date: DateTime.now().minus({ days: 7 }).toISODate() },
          { date: DateTime.now().minus({ days: 6 }).toISODate() },
          { date: DateTime.now().minus({ days: 5 }).toISODate() },
          { date: DateTime.now().minus({ days: 4 }).toISODate() },
          { date: DateTime.now().minus({ days: 3 }).toISODate() },
          { date: DateTime.now().minus({ days: 2 }).toISODate() },
          { date: DateTime.now().minus({ days: 1 }).toISODate() },
        ])
      );
    });
    it('should return empty days when no days are given', () => {
      expect(getDaysPastWeek({})).toEqual(daysFixture([]));
    });
    it('should return empty days when null days are given', () => {
      expect(getDaysPastWeek(null)).toEqual({})
    });
  });
});
