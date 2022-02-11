import { MoodToColor } from '../constants/MoodToColor';
import { HabitFrequency, IHabitType, ValidMood } from '../types';

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

/**
 * Retrieves the color scale (either single color or multiple colors) to provide to chart.
 * If only one mood is selected, only the corresponding color will be selected.
 * If all moods are selected, then all three colors will be returned.
 *
 */
export function getColorScale(mood: ValidMood | 'all'): ColorScalePropType {
  if (mood === 'all') {
    return [MoodToColor.Great, MoodToColor.Okay, MoodToColor['Not Good']];
  }
  return [MoodToColor[mood]];
}
