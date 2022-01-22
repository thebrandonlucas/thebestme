import faker from '@faker-js/faker';
import { DateTime } from 'luxon';
import { DayType, IDayType, IHabitType, OptionalDayType, ValidMoods } from '../../types';
import { moodFactory } from './mood';

/**
 * Randomly generate days given habits
 * @param habits - The habits from which the day data will be generated
 * @param numDays - number of habits to generate
 * @param daysSequential - indicates whether the days should be in a sequence from the start date
 *                         or randomized.
 * @param overrides - Overrides for specific day fields
 */
export function dayFactory(
  habits: IHabitType,
  numDays: number = faker.datatype.number({ min: 1, max: 10 }),
  daysSequential: boolean = true,
  // TODO: add overrides
  // overrides?: OptionalDayType
): IDayType {
  const habitIds: string[] = Object.keys(habits);
  const dayDefaultFactory = {
    id: (date) => date,
    date: (maxYears?: number, refDate?: string) =>
      DateTime.fromJSDate(faker.date.past(maxYears, refDate)),
    // get all habit id's and randomly select a number to go in finished and remaining
    finishedHabitIds: () => faker.random.arrayElements(habitIds),
    remainingHabitIds: (finishedHabitIds: string[]) =>
      habitIds.filter((habitId) =>
        finishedHabitIds.find((finishedHabitId) => habitId === finishedHabitId)
      ),
      // TODO: create arrays of uuids for journals
    cbtIds: () => [],
    awareIds: () => [],
    journalIds: () => [],
    mood: moodFactory,
    endOfDayNotes: () => [],
    finishedHabitCount: (finishedHabitIds: string[]) => finishedHabitIds.length,
    habitCount: (finishedHabitIds: string[], remainingHabitIds: string[]) => finishedHabitIds.length + remainingHabitIds.length,
    // TODO
    habitPercentComplete: () => 0,
    finishDayClickedCount: () => 0,
  };

  // Generate dates
  let dates: string[] = [];

  // Either generate days sequentially from a given past start date
  // (that's at least numDays in the past)
  // or generate dates randomly in the past
  if (daysSequential && numDays > 0) {
    // Must be before this date to ensure it doesn't go into the future
    const refDate = DateTime.now().minus({ days: numDays }).toISODate();
    // A random start date within the past year
    const startDate = dayDefaultFactory.date(1, refDate);
    dates.push(startDate.toISODate());
    let nextDate = startDate;
    for (let i = 0; i < numDays - 1; i++) {
      nextDate = nextDate.plus({ days: 1 });
      dates.push(nextDate.toISODate());
    }
  } else {
    for (let i = 0; i < numDays; i++) {
      dates.push(dayDefaultFactory.date().toISODate());
    }
  }

  const days: IDayType = {};
  for (let i = 0; i < dates.length; i++) {
    const finishedHabitIds = dayDefaultFactory.finishedHabitIds();
    const remainingHabitIds = dayDefaultFactory.remainingHabitIds(finishedHabitIds);
    let currentDay: DayType = {
      id: dates[i],
      date: dates[i],
      finishedHabitIds,
      remainingHabitIds,
      cbtIds: dayDefaultFactory.cbtIds(),
      awareIds: dayDefaultFactory.awareIds(),
      journalIds: dayDefaultFactory.journalIds(),
      mood: dayDefaultFactory.mood(),
      endOfDayNotes: dayDefaultFactory.endOfDayNotes(),
      finishedHabitCount: dayDefaultFactory.finishedHabitCount(finishedHabitIds),
      habitCount: dayDefaultFactory.habitCount(finishedHabitIds, remainingHabitIds),
      habitPercentComplete: dayDefaultFactory.habitPercentComplete(),
      finishDayClickedCount: dayDefaultFactory.finishDayClickedCount(),
    };
    days[currentDay.id] = currentDay;
  }
  return days;
}
