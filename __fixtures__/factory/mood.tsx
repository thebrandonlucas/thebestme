import faker from '@faker-js/faker';

/**
 * Factory for ValidMood array
 * @param moodCount - Number of moods to generate. If left blank, mood will default to random number between 0 and 20
 * @returns
 */
export function moodFactory(moodCount?: number) {
  if (moodCount == null) {
    moodCount = faker.datatype.number({ min: 0, max: 20 });
  }
  let moods = [];
  for (let i = 0; i < moodCount; i++) {
    moods.push(faker.random.arrayElement(['Great', 'Okay', 'Not Good']));
  }
  return moods;
}
