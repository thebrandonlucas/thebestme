import { HabitFrequency, IDayType, IHabitType, ValidMood } from '../types';

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
  mood?: ValidMood,
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
export function getHabitCountForMoodInTimeRange(
  habitId: string,
  days: IDayType,
  isFinished: boolean = true,
  mood?: ValidMood,
  startDatetime?: string, // ISO Timestamps
  endDatetime?: string
): HabitFrequency {
  let habitFrequencies: HabitFrequency = {
    habit: '',
    frequency: 0,
  };

  // 1) filter days for which specified mood was majority (if applicable)
  // 2) filter time range for which specified mood was (majority or just all in range?)
  // Get the number of habits for passed in days
  habitFrequencies = getHabitCount(habitId, days);

  // TODO: get mood

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

// TODO: associate habit count with activities and not just days/times
export function getHabitCountForActivity() {}
