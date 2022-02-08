import { HabitFrequency, IHabitType } from '../../types';

/**
 * Replaces the habit ID with the text of the habit.
 * Example: { habit: '98a6044f-74d9-41e2-aaa3-fda20c657145', frequency: 5 } -> { habit: 'Workout', frequency: 5 }
 * @param habitFrequencies - Habit Frequencies to replace
 */
export function replaceHabitFrequencyIdsWithText(
  habitFrequencies: HabitFrequency[],
  habits: IHabitType
): HabitFrequency[] {
  let frequenciesWithName: HabitFrequency[] = [];
  for (const habitFrequency of habitFrequencies) {
    const habitName: string = habits[habitFrequency.habit].text;
    frequenciesWithName.push({
      habit: habitName,
      frequency: habitFrequency.frequency,
    });
  }
  return frequenciesWithName;
}