import { ValidMoods } from './../types';
/**
 * Get's the mode (most commonly occurring) of moods for a day
 * @param {Array[String]} moods - a list of moods for a single day
 * @return {String} - returns the mode of moods
 */
export function getMoodMode(moods: ValidMoods[]): ValidMoods {
  if (moods.length === 0) {
    return 'No mood provided';
  }
  const validMoods = ['Great', 'Okay', 'Not Good'];
  const invalidMoods = moods.filter(mood => !validMoods.includes(mood));
  if (invalidMoods.length !== 0) {
    return 'Invalid mood found';
  }
  return moods.sort((a,b) =>
      moods.filter(v => v===a).length
    - moods.filter(v => v===b).length
  )[moods.length - 1];
}