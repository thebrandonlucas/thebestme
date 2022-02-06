import { DateTime } from 'luxon';
import { DayType, IDayType } from '../../types';

// need to be able to pass in habits with overrides and have dayFactory account for that
// While knowing what to expect (it can't be random)
// inspired by: https://michalzalecki.com/fixtures-the-way-to-manage-sample-and-test-data/
export function dayFixture(overrides: Partial<DayType> = {}): DayType {
  const defaults: DayType = {
    // FIXME: is ID really necessary for DayType?
    id: '',
    // id: '2b68d805-734b-4f08-9e72-9b62db7d2d96',
    date: '2021-01-01',
    finishedHabitIds: [
      '0d42a4e5-a42a-4dea-9768-a10a38b02ec7',
      'a83fbde7-1fac-4e7c-b3e4-66bff637deb7',
      '908c9ec7-28bf-4d35-a326-a09febb46f82',
    ],
    remainingHabitIds: [
      '72bd6bd4-0097-44e1-aeb0-79f868522945',
      'f430b0cd-0333-4fc9-813a-1c74dca07a1e',
    ],
    cbtIds: [],
    awareIds: [],
    journalIds: [],
    mood: ['Great', 'Okay'],
    endOfDayNotes: [],
    finishedHabitCount: 0,
    habitCount: 0,
    habitPercentComplete: 0,
    finishDayClickedCount: 0,
  };

  return { ...defaults, ...overrides };
}

export function daysFixture(overrides: Partial<DayType>[] = []): IDayType {
  const days: IDayType = {};

  let newDay: DayType;

  // The number of daysAgo to start is equivalent to the number of days being generated
  // Adding +1 because getNextDay() will skip the prevDate
  let prevDate: string = getPastDate(overrides.length + 1);

  for (const override of overrides) {
    newDay = getNextDay(override, prevDate);
    days[newDay.date] = newDay;
    prevDate = newDay.date;
  }

  return days;
}

// Must generate unique dates if not specified in override, otherwise the "days" object will only have one date in it due to dates being used as key
// newDate = prevDate + 1
export function getNextDay(
  override: Partial<DayType>,
  prevDate?: string
): DayType {
  if (override.date || !prevDate) {
    return dayFixture(override);
  }

  return dayFixture({
    date: getNextDate(prevDate),
    ...override,
  });
}

export function getNextDate(date: string) {
  return DateTime.fromISO(date).plus({ days: 1 }).toISODate();
}

/**
 * Get a date in the past by specified number of days
 * @param daysAgo - number of days ago
 * @returns past date in ISO format
 */
export function getPastDate(daysAgo: number) {
  return DateTime.now().minus({ days: daysAgo }).toISODate();
}

// /**
//  * Randomly generate days given habits
//  * @param habits - The habits from which the day data will be generated
//  * @param numDays - number of habits to generate
//  * @param daysSequential - indicates whether the days should be in a sequence from the start date
//  *                         or randomized.
//  * @param overrides - Overrides for specific day fields
//  */
// export function daysFactory(
//   habits: IHabitType,
//   numDays: number = faker.datatype.number({ min: 1, max: 10 }),
//   daysSequential: boolean = true,
//   overrides?: OptionalDayType
// ): IDayType {
//   const habitIds: string[] = Object.keys(habits);
//   const dayDefaultFactory = {
//     id: (date) => date,
//     date: (maxYears?: number, refDate?: string) =>
//       DateTime.fromJSDate(faker.date.past(maxYears, refDate)),
//     // get all habit id's and randomly select a number to go in finished and remaining
//     finishedHabitIds: () => faker.random.arrayElements(habitIds),
//     remainingHabitIds: (finishedHabitIds: string[]) =>
//       habitIds.filter((habitId) =>
//         finishedHabitIds.find((finishedHabitId) => habitId === finishedHabitId)
//       ),
//     // TODO: create arrays of uuids for journals
//     cbtIds: () => Object.keys(cbtFactory()),
//     awareIds: () => [],
//     journalIds: () => Object.keys(primaryJournalFactory()),
//     mood: moodFactory,
//     endOfDayNotes: () => [],
//     finishedHabitCount: (finishedHabitIds: string[]) => finishedHabitIds.length,
//     habitCount: (finishedHabitIds: string[], remainingHabitIds: string[]) =>
//       finishedHabitIds.length + remainingHabitIds.length,
//     // TODO
//     habitPercentComplete: () => 0,
//     finishDayClickedCount: () => 0,
//   };

//   // Generate dates
//   let dates: string[] = [];

//   // Either generate days sequentially from a given past start date
//   // (that's at least numDays in the past)
//   // or generate dates randomly in the past
//   if (daysSequential && numDays > 0) {
//     // Must be before this date to ensure it doesn't go into the future
//     const refDate = DateTime.now().minus({ days: numDays }).toISODate();
//     // A random start date within the past year
//     const startDate = dayDefaultFactory.date(1, refDate);
//     dates.push(startDate.toISODate());
//     let nextDate = startDate;
//     for (let i = 0; i < numDays - 1; i++) {
//       nextDate = nextDate.plus({ days: 1 });
//       dates.push(nextDate.toISODate());
//     }
//   } else {
//     for (let i = 0; i < numDays; i++) {
//       dates.push(dayDefaultFactory.date().toISODate());
//     }
//   }

//   const days: IDayType = {};
//   for (let i = 0; i < dates.length; i++) {
//     const finishedHabitIds = dayDefaultFactory.finishedHabitIds();
//     const remainingHabitIds =
//       dayDefaultFactory.remainingHabitIds(finishedHabitIds);
//     let currentDay: DayType = {
//       id: dates[i],
//       date: dates[i],
//       finishedHabitIds,
//       remainingHabitIds,
//       cbtIds: dayDefaultFactory.cbtIds(),
//       awareIds: dayDefaultFactory.awareIds(),
//       journalIds: dayDefaultFactory.journalIds(),
//       mood: dayDefaultFactory.mood(),
//       endOfDayNotes: dayDefaultFactory.endOfDayNotes(),
//       finishedHabitCount:
//         dayDefaultFactory.finishedHabitCount(finishedHabitIds),
//       habitCount: dayDefaultFactory.habitCount(
//         finishedHabitIds,
//         remainingHabitIds
//       ),
//       habitPercentComplete: dayDefaultFactory.habitPercentComplete(),
//       finishDayClickedCount: dayDefaultFactory.finishDayClickedCount(),
//     };
//     days[currentDay.id] = currentDay;
//   }

//   // overwrite overrides
//   for (const date in days) {
//     for (const prop in overrides) {
//       if (!days[date][prop]) {
//         throw Error('Invalid property ' + prop + ' provided to IDayType');
//       }
//       days[date][prop] = overrides[prop];
//     }
//   }

//   return days;
// }
