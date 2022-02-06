import { HabitFrequency, IDayType, IHabitType, ValidMood } from '../types';
import { getDaysWithSelectedMood } from './mood';

/**
 * Get the frequencies of finished or remaining habits for a given mood
 * @param habitId - the id of the habit to get frequencies for
 * @param days - days object from which to pull completed habits for given days
 * @param mood - The mood to evaluate. If undefined, will get total frequencies for each mood
 * @param checkFinishedHabits - Whether or not to get frequencies for habits that were finished or completed
 * @param startDatetime - Beginning time range to start grabbing habits from
 * @param endDatetime - Ending time range to grab habits from
 * @returns - A list of objects containing frequencies for each habit for the chosen mood
 */
export function getHabitCountForMoodInTimeRange(
  habitId: string,
  days: IDayType,
  mood?: ValidMood,
  checkFinishedHabits: boolean = true,
  startDatetime?: string, // ISO Timestamps
  endDatetime?: string
): HabitFrequency {
  let habitFrequencies: HabitFrequency = {
    habit: '',
    frequency: 0,
  };
  let tempDays = days;

  // TODO: filter time range for which specified mood was (majority or just all in range?)
  if (mood) {
    tempDays = getDaysWithSelectedMood(mood, tempDays);
  }
  habitFrequencies = getHabitCount(habitId, tempDays, checkFinishedHabits);
  return habitFrequencies;
}

// get habit count for specified number of days
export function getHabitCount(
  selectedHabitId: string,
  days: IDayType,
  checkFinishedHabits = true
): HabitFrequency {
  let habitFrequency: HabitFrequency = { habit: selectedHabitId, frequency: 0 };
  for (const day in days) {
    const currentDay = days[day];
    const habitIdsToCheck = checkFinishedHabits
      ? currentDay.finishedHabitIds
      : currentDay.remainingHabitIds;
    if (habitIdsToCheck.includes(selectedHabitId)) {
      habitFrequency.frequency += 1;
    }
  }
  return habitFrequency;
}

// FIXME: refactor the below to functions to be D.R.Y.
export function getHabitFinishedDays(
  habitId: string,
  days: IDayType
): IDayType {
  let finishedDays: IDayType = {};

  for (const date in days) {
    if (days[date].finishedHabitIds.includes(habitId)) {
      finishedDays[date] = days[date];
    }
  }

  return finishedDays;
}

export function getHabitRemainingDays(
  habitId: string,
  days: IDayType
): IDayType {
  let remainingDays: IDayType = {};

  for (const date in days) {
    if (days[date].remainingHabitIds.includes(habitId)) {
      remainingDays[date] = days[date];
    }
  }

  return remainingDays;
}

// TODO: associate mood count with activities and not just days/times
export function getMoodCountForActivity() {}
