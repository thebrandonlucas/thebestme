import faker from '@faker-js/faker';
import { DateTime } from 'luxon';

// TODO: add all defaults from other files to this file (modularize)
export const journalDefaults = {
  date: DateTime.fromJSDate(faker.date.recent()).toISODate(),
  text: faker.hacker.phrase(),
};

export const cbtDefaults = {
  date: DateTime.fromJSDate(faker.date.recent()).toISODate(),
  // TODO: modularize
  situationText: faker.hacker.phrase(),
  thoughtsText: faker.hacker.phrase(),
  emotionsText: faker.hacker.phrase(),
  behaviorsText: faker.hacker.phrase(),
  alternativeThoughtsText: faker.hacker.phrase(),
};
