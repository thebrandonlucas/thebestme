import { IDayType, IHabitType, ValidMoods } from '../types';

// Note: since params are passed in as arrays, any arrays passed in will be double-arrays
export type TableTest<ParamsType, ResultType> = [ParamsType, ResultType][];

export type UnitTestInputAndExpectedResult<Input, Result> = {
  input: Input;
  result: Result;
};

export type GetTopHabitFrequenciesPerMoodInput = [
  // ISO format (YYYY-MM-DD) is there a way to validate string format in Typescript?
  startDate: string,
  endDate: string,
  numberOfTopHabitsToGet: number,
  days: IDayType,
  habits: IHabitType,
  moodToGet?: string,
  habitToGet?: string
];

export type GetMoodFrequenciesForHabit = [
  habitId: string,
  habits: IHabitType,
  days: IDayType,
  isFinished?: boolean,
  startDate?: string,
  endDate?: string
];

export type GetTopHabitFrequenciesPerMoodResult = {
  habit: string;
  frequency: number;
}[][];

// TODO
export type GetCalendarDataInputs = {};

export type GetCalendarDataResult = {};

export type GetHabitFrequenciesParams = [
  mood: ValidMoods,
  habits: IHabitType,
  days: IDayType
];
