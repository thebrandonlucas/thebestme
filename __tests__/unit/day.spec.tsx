import { DateTime } from 'luxon';
import { getDaysInTimeRange, isDatetimeInRange } from '../../utils/day';
import { getDaysWithSelectedMood } from '../../utils/mood';
import {
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
      expect(getPastDate(1)).toBe(DateTime.now().minus({ days: 1 }).toISODate());
    });
    it('should get 3 days ago', () => {
      expect(getPastDate(3)).toBe(DateTime.now().minus({ days: 3 }).toISODate())
    })
  });
});
