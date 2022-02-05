import { IDayType, MoodFrequency, ValidMood } from '../types';
/**
 * Get's the mode (most commonly occurring) of moods for a day
 * @param {Array[String]} moods - a list of moods for a single day
 * @return {String} - returns the mode of moods
 */
export function getMoodMode(moods: ValidMood[]): ValidMood {
  if (moods.length === 0) {
    return 'No mood provided';
  }
  const ValidMood = ['Great', 'Okay', 'Not Good'];
  const inValidMood = moods.filter((mood) => !ValidMood.includes(mood));
  if (inValidMood.length !== 0) {
    return 'Invalid mood found';
  }
  return moods.sort(
    (a, b) =>
      moods.filter((v) => v === a).length - moods.filter((v) => v === b).length
  )[moods.length - 1];
}

// Get days for which the mood specified was the primary mood
export function getDaysWithSelectedMood(
  mood: ValidMood,
  days: IDayType
): IDayType {
  let daysWithMood: IDayType = {};
  for (const date in days) {
    const day = days[date];
    // .slice() passes in a copy of the array instead of original
    if (getMoodMode(day.mood.slice()) === mood) {
      daysWithMood[day.date] = day;
    }
  }
  return daysWithMood;
}