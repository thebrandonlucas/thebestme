import faker from '@faker-js/faker';
import { OptionalIJournalEntryType } from '../../../types';
import { journalDefaults } from './defaults';
/**
 * Factory for Primary Journals
 * @param count - number of journals to generate
 * @param overrides - overrides from randomly generated data
 * @returns Object containing CBT journal objects indexed by uuid
 */
export function primaryJournalFactory(
  count: number = faker.datatype.number({ min: 1, max: 10 }),
  overrides = {}
): OptionalIJournalEntryType {
  let journals: OptionalIJournalEntryType = {};

  for (let i = 0; i < count; i++) {
    const id = faker.datatype.uuid();
    for (const journalProp in journalDefaults) {
      const isOverridePropNotNull = overrides && overrides[journalProp];
      if (!journals[id]) {
        journals[id] = {
          [journalProp]: isOverridePropNotNull
            ? overrides[journalProp]
            : journalDefaults[journalProp],
        };
      } else {
        journals[id][journalProp] = isOverridePropNotNull
          ? overrides[journalProp]
          : journalDefaults[journalProp];
      }
    }
  }
  return journals;
}
