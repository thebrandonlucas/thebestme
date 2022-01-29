import {
  getDaysInTimeRange,
  isDateInRange,
} from '../../utils/getHabitFrequencies';
import { daysFixture } from '../../__fixtures__/factory/day';

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

  describe('IsDateInRange', () => {
    it('should be in between start and end date', () => {
      expect(isDateInRange('2021-01-01', '2021-03-01', '2021-01-02')).toBe(
        true
      );
      expect(isDateInRange('2021-12-23', '2023-03-03', '2022-01-01')).toBe(
        true
      );
    });
    it('should return false if it is earlier than start date', () => {
      expect(isDateInRange('2021-01-01', '2020-12-31', '2021-01-02')).toBe(
        false
      );
      expect(isDateInRange('2021-12-23', '2021-01-01', '2023-03-03')).toBe(
        false
      );
    });
    it('should return false if it is later than end date', () => {
      expect(isDateInRange('2021-01-01', '2021-01-02', '2021-03-01')).toBe(
        false
      );
      expect(isDateInRange('2021-12-23', '2022-01-01', '2022-01-03')).toBe(
        false
      );
    });
  });
});
