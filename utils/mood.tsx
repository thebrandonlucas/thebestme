import { DateTime } from 'luxon';
import {
  DayType,
  FrequencyByDate,
  IDayType,
  MoodFrequency,
  ValidMood,
} from '../types';
/**
 * Get's the mode (most commonly occurring) of moods for a day
 * @param {Array[String]} moods - a list of moods for a single day
 * @return {String} - returns the mode of moods
 */
export function getMoodMode(
  moods: ValidMood[]
): ValidMood | 'No mood provided' | 'Invalid mood found' {
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

/**
 * Get habits with selected mood occurring in days
 */
export function getNumberOfHabitsWithSelectedMood(
  mood: ValidMood,
  days: IDayType
) {
  let habitsForMood = new Set();
  let tempDays = getDaysWithSelectedMood(mood, days);
  for (const date in tempDays) {
    // TODO: allow for remainingHabitIds to be tested
    tempDays[date].finishedHabitIds.forEach((id) => {
      habitsForMood.add(id);
    });
  }
  return habitsForMood.size;
}

/**
 * Get a mood frequency given days and (optionally) a mood. If no mood is given, it will retrieve frequencies for each mood
 */
export function getMoodFrequency(days: IDayType, mood: ValidMood) {
  const selectedDays = getDaysWithSelectedMood(mood, days);
  return { mood, frequency: Object.keys(selectedDays).length };
}

/**
 * Get the total number of mood frequencies, instead of just the most common mood for days.
 * (typically going to be used to show mood spread for a single day)
 * @param days
 * @param mood
 */
export function getMoodCountTotal(days: IDayType, mood: ValidMood) {
  let moodCount = 0;
  for (const date in days) {
    const day = days[date];
    for (const currentMood of day.mood) {
      if (currentMood === mood) {
        moodCount += 1;
      }
    }
  }
  return moodCount;
}

/**
 * Get a mood frequency given days and (optionally) a mood. If no mood is given, it will retrieve frequencies for each mood
 */
export function getMoodFrequencies(
  days: IDayType,
  mood?: ValidMood
): MoodFrequency {
  let moodFrequencies: MoodFrequency = { Great: 0, Okay: 0, 'Not Good': 0 };

  const selectedDays = mood ? getDaysWithSelectedMood(mood, days) : days;

  for (const date in selectedDays) {
    const moodMode = getMoodMode(selectedDays[date].mood);
    moodFrequencies[moodMode] += 1;
  }

  return moodFrequencies;
}

// TODO: make so that it's designed to get one days mood frequency and match with a given timestamp date
export function getMoodFrequencyByDate(
  day: DayType,
  mood: ValidMood
): FrequencyByDate {
  let moodFrequencyForDay = {
    date: DateTime.fromISO(day.date).toJSDate(),
    frequency: 0,
  };

  for (const currentMood of day.mood) {
    if (currentMood === mood) {
      moodFrequencyForDay.frequency += 1;
    }
  }

  return moodFrequencyForDay;
}

export function getMoodFrequencyByDates(
  days: IDayType,
  mood: ValidMood
): FrequencyByDate[] {
  let moodFrequencyForDays = [];

  for (const date in days) {
    moodFrequencyForDays.push(getMoodFrequencyByDate(days[date], mood));
  }

  return moodFrequencyForDays;
}
