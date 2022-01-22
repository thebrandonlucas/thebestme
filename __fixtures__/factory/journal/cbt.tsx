import faker from '@faker-js/faker';
import { OptionalICbtJournalEntryType } from '../../../types';
import { cbtDefaults } from './defaults';
/**
 * Factory for CBT Journals
 * @param count - number of journals to generate
 * @param overrides - overrides from randomly generated data
 * @returns Object containing CBT journal objects indexed by uuid
 */
// TODO: this is modularizable with primary journal faker
export function cbtFactory(
  count: number = faker.datatype.number({ min: 1, max: 10 }),
  overrides = {}
): OptionalICbtJournalEntryType {
  // FIXME: technically, this shouldn't be optional, since it should be returning CBTJournals with all fields
  let journals: OptionalICbtJournalEntryType = {};

  for (let i = 0; i < count; i++) {
    const id = faker.datatype.uuid();
    for (const cbtProp in cbtDefaults) {
      const isOverridePropNotNull = overrides && overrides[cbtProp];
      if (!journals[id]) {
        journals[id] = {
          [cbtProp]: isOverridePropNotNull
            ? overrides[cbtProp]
            : cbtDefaults[cbtProp],
        };
      } else {
        journals[id][cbtProp] = isOverridePropNotNull
          ? overrides[cbtProp]
          : cbtDefaults[cbtProp];
      }
    }
  }
  return journals;
}
