import { DateTime } from 'luxon';
import { IHabitType, OptionalHabitType } from '../../types';
import { dayFactory } from '../../__fixtures__/factory/day';
import { habitFactory } from '../../__fixtures__/factory/habit';

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
    expect(Object.keys(dayFactory(habits)).length).toBeGreaterThan(1);
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
          console.log('prev', prevDate.toISODate(), currentDate.toISODate())

          expect(daysDiff).toBe(1);

        }
        prevDate = currentDate
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
        expect(date.startOf("day") <= DateTime.now()).toBe(true);
      }
    }
  });

  // TODO: 
  // test('should have all the right day properties for each day', () => {

  // });

  // test('should override day properties correctly for each property', () => {

  // });
});

// describe('Calendar factory', () => {});
