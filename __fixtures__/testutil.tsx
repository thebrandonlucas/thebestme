import faker from '@faker-js/faker';
import { DayType, HabitType, IDayType, IHabitType, ValidMood } from '../types';
import { daysFixture } from './factory/day';
import { TableTest } from './test-types';

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

/**
 * Return Test day and habit data for manual testing of app
 * @param numDays - number of days to generate
 * @param habits - optional habits array to provide. The index of the array is the day it gets overridden (day 1 is index 0)
 * @param moods - optional, if provided, only days with the given "mood mode" will be generated
 */
export function generateTestDaysWithHabitsRandom(
  numDays: number,
  habits?: IHabitType,
  moods?: ValidMood[]
): IDayType {
  let dayOverrides = [];

  for (let i = 0; i < numDays; i++) {
    const habitOverrides = getHabitDayPropertiesRandom(habits);
    const moodOverride = getRandomMoods(moods);
    dayOverrides.push({ mood: moodOverride, ...habitOverrides });
  }

  return daysFixture(dayOverrides);
}

/**
 * Randomly places habit in finishedHabitIds or remainingHabitIds and calculates other DayType habit properties
 * @param habit - the habit to place
 */
export function getHabitDayPropertiesRandom(
  habits: IHabitType
): Partial<DayType> {
  if (habits) {
    let finishedHabitIds = [];
    let remainingHabitIds = [];
    let habitCount = 0;
    let habitPercentComplete = 0;
    for (const habitId in habits) {
      const habit = habits[habitId];
      if (faker.datatype.boolean() === true) {
        finishedHabitIds.push(habit.id);
      } else {
        remainingHabitIds.push(habit.id);
      }
    }
    habitCount = finishedHabitIds.length + remainingHabitIds.length;
    habitPercentComplete = Math.round(remainingHabitIds.length / habitCount * 100) / 100;
    return {
      finishedHabitIds,
      remainingHabitIds,
      habitCount,
      habitPercentComplete,
    };
  }
  return {};
}

export function getRandomMoods(moods: ValidMood[]) {
  return moods
    ? faker.random.arrayElements(moods)
    : faker.random.arrayElements(['Great', 'Okay', 'Not Great']);
}
