/**
 * Get's the mode (most commonly occurring) of moods for a day
 * @param {Array[String]} moods - a list of moods for a single day
 * @return {String} - returns the mode of moods
 */
export function getMoodMode(moods: string[]) {
    return moods.sort((a,b) =>
        moods.filter(v => v===a).length
      - moods.filter(v => v===b).length
    )[moods.length - 1];    
}