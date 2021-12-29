import { IDayType, IHabitType, ValidHabits } from '../types';

export type TableTest<ParamType, ResultType> = [ParamType[], ResultType][];

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

export type GetTopHabitFrequenciesPerMoodResult = {
  habit: string;
  frequency: number;
}[][];

// TODO
export type GetCalendarDataInputs = {};

export type GetCalendarDataResult = {};

export type GetHabitFrequenciesParams = [
  mood: ValidHabits,
  habits: IHabitType,
  days: IDayType
];
