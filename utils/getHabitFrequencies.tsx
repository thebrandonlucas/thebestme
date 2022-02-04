import { DateTime } from 'luxon';
import { HabitFrequency, IDayType, IHabitType, ValidMoods } from '../types';
import { getMoodMode } from './mood';

/**
 * Get the frequencies of finished or remaining habits for a given mood
 * @param habitId - the id of the habit to get frequencies for
 * @param habits - habits object from which to reference habit text
 * @param days - days object from which to pull completed habits for given days
 * @param mood - The mood to evaluate. If undefined, will get total frequencies for each mood
 * @param isFinished - Whether or not to get frequencies for habits that were finished or completed
 * @returns - A list of objects containing frequencies for each habit for the chosen mood
 */
export function getHabitFrequencies(
  habitId: string,
  habits: IHabitType,
  days: IDayType,
  isFinished: boolean = true,
  mood?: ValidMoods,
  startDate?: string,
  endDate?: string
): HabitFrequency[] {
  let habitFrequencies: HabitFrequency[] = [];

  // Loop thru days
  // use days habitId's to get habit text
  // if mood at day matches desired mood,
  // if habitFrequencies.habit {
  // habitFrequencies.habit += 1
  // } else {
  //    habitFrequencies['habit'] = 1

  // }
  //

  return habitFrequencies;
}

export function getHabitsWithMood() {}

export function getRemainingHabitFrequencies() {}

export function getFinishedHabitFrequencies() {}

/**
 * Get the frequencies of finished or remaining habits for a given mood
 * @param habitId - the id of the habit to get frequencies for
 * @param habits - habits object from which to reference habit text
 * @param days - days object from which to pull completed habits for given days
 * @param mood - The mood to evaluate. If undefined, will get total frequencies for each mood
 * @param isFinished - Whether or not to get frequencies for habits that were finished or completed
 * @returns - A list of objects containing frequencies for each habit for the chosen mood
 */
export function getHabitMoodCountForTimeRange(
  habitId: string,
  habits: IHabitType,
  days: IDayType,
  isFinished: boolean = true,
  mood?: ValidMoods,
  startDatetime?: string, // ISO Timestamps
  endDatetime?: string
): HabitFrequency {
  let habitFrequencies: HabitFrequency = {
    habit: '',
    frequency: 0,
  };

  // Get the number of habits for passed in days
  habitFrequencies = getHabitCount(habitId, days);

  return habitFrequencies;
}

// get habit count for specified number of days
export function getHabitCount(
  selectedHabitId: string,
  days: IDayType
): HabitFrequency {
  let habitFrequency: HabitFrequency = { habit: selectedHabitId, frequency: 0 };
  for (const day in days) {
    const currentDay = days[day];
    if (currentDay.finishedHabitIds.includes(selectedHabitId)) {
      habitFrequency.frequency += 1;
    }
  }
  return habitFrequency;
}

// get days within the specified time range
export function getDaysInTimeRange(
  days: IDayType,
  startDatetime: string,
  endDatetime: string
): IDayType {
  let daysInRange: IDayType = {};
  for (const date in days) {
    // TODO: convert days to datetimes
    const day = days[date];
    if (isDatetimeInRange(startDatetime, endDatetime, day.date)) {
      daysInRange[day.date] = day;
    }
  }
  return daysInRange;
}

// Get days for which the mood specified was the primary mood
export function getDaysWithPrimaryMood(
  mood: ValidMoods,
  days: IDayType
): IDayType {
  let daysWithMood: IDayType = {};
  for (const date in days) {
    const day = days[date];
    if (getMoodMode(day.mood.slice()) === mood) {
      daysWithMood[day.date] = day;
    }
  }
  return daysWithMood;
}

export function isDatetimeInRange(
  startDatetimeISO: string,
  endDatetimeISO: string,
  compareDatetimeISO: string
): boolean {
  const [startDate, endDate, compareDate] = [
    DateTime.fromISO(startDatetimeISO),
    DateTime.fromISO(endDatetimeISO),
    DateTime.fromISO(compareDatetimeISO),
  ];
  return startDate <= compareDate && compareDate <= endDate;
}
