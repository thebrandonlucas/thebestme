import faker from '@faker-js/faker';
import { HabitType, IHabitType, OptionalHabitType } from '../../types';

/**
 * Randomly generates habits and days (with corresponding habit completions)
 * @param numHabits - number of habits to generate
 * @param overrides - Overrides for specific day or habit fields
 */
export function habitFactory(
  numHabits: number = faker.datatype.number({ min: 1, max: 10 }),
  overrides?: OptionalHabitType
) {
  let habits: IHabitType = {};

  const habitDefaultFactory = {
    checked: () => faker.datatype.boolean(),
    deleted: () => faker.datatype.boolean(),
    id: () => faker.datatype.uuid(),
    text: () => faker.lorem.words(),
  };

  for (let i = 0; i < numHabits; i++) {
    let currentHabit: HabitType = {
      id: '',
      checked: false,
      text: '',
      deleted: false,
    };
    const id = habitDefaultFactory.id();
    for (const habitProp in habitDefaultFactory) {
      if (habitProp === 'id') {
        currentHabit.id = id;
        continue;
      } else {
        if (overrides !== undefined && overrides[habitProp] !== undefined) {
          currentHabit[habitProp] = overrides[habitProp];
        } else {
          currentHabit[habitProp] = habitDefaultFactory[habitProp]();
        }
      }
    }
    habits[id] = currentHabit;
  }
  return habits;
}