import {
  HabitFrequency,
  HabitType,
  IDayType,
  IHabitType,
  ValidMood,
} from '../types';
import {
  getDaysWithSelectedMood,
  getNumberOfHabitsWithSelectedMood,
} from './mood';

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
export function getHabitFrequencyForMoodInTimeRange(
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
  habitFrequencies = getHabitFrequency(habitId, tempDays, checkFinishedHabits);
  return habitFrequencies;
}

/**
 * Get the top habit(s) frequencies per mood (or all moods)
 */
export function getTopHabitFrequencyPerMood(
  days: IDayType,
  habits: IHabitType,
  mood?: ValidMood
): HabitFrequency {
  let topHabitFrequency: HabitFrequency = {
    habit: '',
    frequency: 0,
  };

  for (const habitId in habits) {
    const currentHabitFrequency = getHabitFrequencyForMoodInTimeRange(
      habitId,
      days,
      mood
    );
    topHabitFrequency =
      currentHabitFrequency.frequency > topHabitFrequency.frequency
        ? currentHabitFrequency
        : topHabitFrequency;
  }

  return topHabitFrequency;
}

/**
 * Get top N habit frequencies
 */
export function getTopHabitFrequenciesPerMood(
  days: IDayType,
  habits: IHabitType,
  N?: number,
  mood?: ValidMood
) {
  let topHabitFrequencies: HabitFrequency[] = [];
  let tempHabits = { ...habits };
  let habitCount = 0;

  // Get the total number of habits that occur in days for which the selected mood is most common mood
  habitCount = mood
    ? getNumberOfHabitsWithSelectedMood(mood, days)
    : Object.keys(habits).length;
  const numFrequencies = N !== null && N < habitCount ? N : habitCount;

  for (let i = 0; i < numFrequencies; i++) {
    const habitFrequency: HabitFrequency = getTopHabitFrequencyPerMood(
      days,
      tempHabits,
      mood
    );
    topHabitFrequencies.push(habitFrequency);
    delete tempHabits[habitFrequency.habit];
  }
  return topHabitFrequencies;
}

// get habit count for specified number of days
export function getHabitFrequency(
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

/**
 * Get habit count for a particular mood given days
 */
export function getHabitCount(
  habitId: string,
  days: IDayType,
  checkFinishedHabits: boolean = true
) {
  let habitCount = 0;
  for (const date in days) {
    const day = days[date];
    const habitIdsToCheck = checkFinishedHabits
      ? day.finishedHabitIds
      : day.remainingHabitIds;
    if (habitIdsToCheck.includes(habitId)) {
      habitCount += 1;
    }
  }
  return habitCount;
}

/**
 * Get habit count for a particular mood
 */
export function getHabitCountForMood(
  habitId: string,
  days: IDayType,
  mood: ValidMood,
  checkFinishedHabits: boolean = true
) {
  const daysWithMood = getDaysWithSelectedMood(mood, days);
  return getHabitCount(habitId, daysWithMood, checkFinishedHabits);
}

/**
 * Retrieve habits from a set of ids
 * @param habits - The habits to retrieve from
 * @param ids - An array of habit ids
 */
export function getHabitsFromIds(
  habits: IHabitType,
  ids: string[]
): IHabitType {
  let selectedHabits: IHabitType = {};
  for (const id of ids) {
    selectedHabits[id] = habits[id];
  }
  return selectedHabits;
}

/**
 * Retrieve habits from a set of ids and return as array
 * @param habits
 * @param ids
 * @returns
 */
export function getHabitsFromIdsAsArray(
  habits: IHabitType,
  ids: string[]
): HabitType[] {
  let selectedHabits: HabitType[] = [];
  for (const id of ids) {
    selectedHabits.push(habits[id]);
  }
  return selectedHabits;
}

/**
 * Get the id's of habits marked as 'checked'
 */
export function getFinishedHabitIds(habits: IHabitType): string[] {
  return Object.keys(habits).filter((id) => habits[id].checked === true);
}

/**
 * Get the id's of habits not marked as 'checked'
 */
export function getRemainingHabitIds(habits: IHabitType): string[] {
  return Object.keys(habits).filter((id) => habits[id].checked === false);
}

/**
 * Get the id's of habits.
 * @param isFinished: Optional parameter to determine whether to get finished or remaining habits
 */
export function getHabitIds(
  habits: IHabitType,
  isFinished?: boolean
): string[] {
  if (isFinished == null) return Object.keys(habits);
  return Object.keys(habits).filter((id) => habits[id].checked === isFinished);
}

/**
 * Get's the habits in the specified start and end date
 * @param habits
 * @param startDate
 * @param endDate
 * @returns habitsInWeek
 */
export function getHabitsInDateRange(
  habits: IHabitType,
  startDate: string,
  endDate: string
): IHabitType {
  let habitsInWeek = {};

  return habitsInWeek;
}

/**
 * Get only non deleted habits
 */
export function getNonDeletedHabits(habits: IHabitType) {
  let nonDeletedHabits = {};
  for (const habitId in habits) {
    const habit = habits[habitId];
    if (!habit.deleted) {
      nonDeletedHabits[habit.id] = habit;
    }
  }
  return nonDeletedHabits;
}
// TODO: associate mood count with activities and not just days/times
export function getMoodCountForActivity() {}
