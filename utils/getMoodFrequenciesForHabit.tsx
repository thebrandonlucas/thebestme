import { HabitFrequency, IDayType, IHabitType, ValidHabits } from '../types';

/**
 * Get the frequencies of finished or remaining habits for a given mood
 * @param habits - habits object from which to reference habit text
 * @param days - days object from which to pull completed habits for given days
 * @param mood - The mood to evaluate
 * @param isFinished - Whether or not to get frequencies for habits that were finished or completed
 * @returns - A list of objects containing frequencies for each habit for the chosen mood
 */
export function getMoodFrequenciesForHabit(
  habitId: string,
  habits: IHabitType,
  days: IDayType,
  isFinished?: boolean,
  startDate?: string,
  endDate?: string,
): HabitFrequency {
  let habitFrequencies: HabitFrequency = [];
  
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
};
